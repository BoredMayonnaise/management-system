#include "routes.h" // Includes crow.h and Session definition
#include "database.h" // For Database class
#include "utils.h"    // For hashPassword and secure_compare
#include "crow/json.h" // For JSON parsing and building
#include <jwt-cpp/jwt.h> // For JWT generation
#include <chrono> // For setting token expiry

void setupRoutes(crow::App<crow::CORSHandler, crow::CookieParser, Session>& app, Database& db) {
    const std::string JWT_SECRET = "supersecretjwtkeythatshouldbemorecomplexandfromenv"; // TODO: Load from env
    const int JWT_EXPIRY_HOURS = 24;

    // Login Route
    CROW_ROUTE(app, "/api/login")
        .methods("POST"_method)
        ([&](const crow::request& req) {
            crow::json::wvalue response;
            
            // 1. Parse Incoming JSON
            crow::json::rvalue x;
            try {
                x = crow::json::load(req.body);
            } catch (const std::runtime_error& e) {
                response["message"] = "Invalid JSON: " + std::string(e.what());
                return crow::response(400, response);
            }
            
            if (!x.has("id") || !x.has("password")) {
                response["message"] = "Missing ID or Password";
                return crow::response(400, response);
            }

            std::string input_id = x["id"].s();
            std::string input_password = x["password"].s();

            // 2. Query Database
            std::string sql = "SELECT id, password_hash, salt, role FROM users WHERE id = ?;";
            
            sqlite3_stmt* stmt;
            if (sqlite3_prepare_v2(db.getDb(), sql.c_str(), -1, &stmt, nullptr) != SQLITE_OK) {
                response["message"] = "Database error during prepare";
                return crow::response(500, response);
            }

            sqlite3_bind_text(stmt, 1, input_id.c_str(), -1, SQLITE_STATIC);

            int result = sqlite3_step(stmt);
            
            if (result == SQLITE_ROW) {
                std::string stored_id = reinterpret_cast<const char*>(sqlite3_column_text(stmt, 0));
                std::string stored_hash = reinterpret_cast<const char*>(sqlite3_column_text(stmt, 1));
                std::string stored_salt = reinterpret_cast<const char*>(sqlite3_column_text(stmt, 2));
                std::string stored_role = reinterpret_cast<const char*>(sqlite3_column_text(stmt, 3));

                // 3. Verify Password
                std::string hashed_input = hashPassword(input_password, stored_salt);

                if (secure_compare(hashed_input, stored_hash)) {
                    // Password correct, generate JWT
                    auto token = jwt::create()
                        .set_issuer("auth.iihc.com")
                        .set_type("JWT")
                        .set_issued_at(std::chrono::system_clock::now())
                        .set_expires_at(std::chrono::system_clock::now() + std::chrono::hours{JWT_EXPIRY_HOURS})
                        .set_payload_claim("id", jwt::claim(stored_id))
                        .set_payload_claim("role", jwt::claim(stored_role))
                        .sign(jwt::algorithm::hs256{JWT_SECRET});

                    crow::response res(200, crow::json::wvalue({{"message", "Login successful"}, {"user", {{"id", stored_id}, {"role", stored_role}}}}));
                    
                    // Set HttpOnly cookie
                    // Expires in JWT_EXPIRY_HOURS hours
                    auto expiry_time = std::chrono::system_clock::now() + std::chrono::hours{JWT_EXPIRY_HOURS};
                    std::time_t tt = std::chrono::system_clock::to_time_t(expiry_time);
                    std::tm* ptm = std::gmtime(&tt);
                    char buffer[32];
                    std::strftime(buffer, 32, "%a, %d %b %Y %H:%M:%S GMT", ptm);

                    std::string cookie_header = "jwt_token=" + token + "; Path=/; Expires=" + std::string(buffer) + "; HttpOnly; SameSite=Lax; Secure"; // Secure in production with HTTPS
                    res.add_header("Set-Cookie", cookie_header);

                    sqlite3_finalize(stmt);
                    return res;
                } else {
                    // Wrong Password
                    response["message"] = "Invalid credentials";
                    sqlite3_finalize(stmt);
                    return crow::response(401, response);
                }
            } else {
                // User Not Found
                response["message"] = "Invalid credentials"; // Generalize message for security
                sqlite3_finalize(stmt);
                return crow::response(401, response);
            }
        });

    // Logout Route
    CROW_ROUTE(app, "/api/logout")
        .methods("POST"_method)
        ([&](const crow::request& req) {
                        crow::json::wvalue res;
                        res["message"] = "Logout successful";
                        crow::response response(200, res);
                        response.add_header("Set-Cookie", "jwt_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax; Secure");
                        return response;
                    });

    // Check Auth Route
    CROW_ROUTE(app, "/api/check-auth")
        .methods("GET"_method)
        ([&](const crow::request& req) {
            crow::json::wvalue res;
            
            // Get JWT from cookie using Crow's CookieParser
            std::string token = req.get_cookie("jwt_token");
            if (token.empty()) {
                res["authenticated"] = false;
                res["message"] = "No JWT token found";
                return crow::response(401, res);
            }

            auto decoded_jwt_opt = verifyJwtToken(token, JWT_SECRET);

            if (decoded_jwt_opt) {
                auto decoded_jwt = decoded_jwt_opt.value();
                std::string user_id = decoded_jwt.get_payload_claim("id").as_string();
                std::string user_role = decoded_jwt.get_payload_claim("role").as_string();

                res["authenticated"] = true;
                res["user_id"] = user_id;
                res["user_role"] = user_role;
                return crow::response(200, res);
            } else {
                res["authenticated"] = false;
                res["message"] = "Invalid or expired JWT token";
                return crow::response(401, res);
            }
        });

    // Example protected route (requires JWT)
    CROW_ROUTE(app, "/api/protected")
        .methods("GET"_method)
        ([&](const crow::request& req) {
            crow::json::wvalue res;
            
            // Get JWT from cookie using Crow's CookieParser
            std::string token = req.get_cookie("jwt_token");
            if (token.empty()) {
                res["message"] = "No JWT token found";
                return crow::response(401, res);
            }

            auto decoded_jwt_opt = verifyJwtToken(token, JWT_SECRET);

            if (decoded_jwt_opt) {
                auto decoded_jwt = decoded_jwt_opt.value();
                std::string user_id = decoded_jwt.get_payload_claim("id").as_string();

                res["message"] = "Welcome to the protected area, " + user_id;
                return crow::response(200, res);
            } else {
                res["message"] = "Unauthorized: Invalid or expired JWT token";
                return crow::response(401, res);
            }
        });
}