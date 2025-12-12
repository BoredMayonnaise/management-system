#include "crow.h"
#include "database.h"
#include "routes.h" // Include routes.h for setupRoutes declaration
#include "crow/middlewares/cors.h"
#include "crow/middlewares/cookie_parser.h" // Include for CookieParser
#include "crow/middlewares/session.h"      // Include for Session middleware
#include <cstdlib> // Required for std::getenv
#include <iostream> // Required for std::cout

// No need to redeclare setupRoutes here, it's in routes.h

int main() {
    
    // Create a Crow application instance with CORS, CookieParser, and Session support.
    crow::App<crow::CORSHandler, crow::CookieParser, Session> app;

    // Configure CORS to allow requests from the frontend.
    auto& cors = app.get_middleware<crow::CORSHandler>().global();
    
    const char* frontend_origin_env = std::getenv("FRONTEND_ORIGIN");
    std::string frontend_origin = frontend_origin_env ? frontend_origin_env : "http://localhost:3001";

    std::cout << "CORS allowing origin: " << frontend_origin << std::endl;

    cors.origin(frontend_origin) 
        .methods("GET"_method, "POST"_method, "PUT"_method, "DELETE"_method, "OPTIONS"_method)
        .headers("Content-Type", "Accept", "Authorization");

    // Initialize the database and set up the application routes.
    Database db("../backend/payroll.db");
    db.init();

    // Pass the app and database instances to the route setup function.
    setupRoutes(app, db);

    // Manually handle static file serving for uploaded content.
    CROW_ROUTE(app, "/uploads/<path>")
    ([](const crow::request&, crow::response& res, const std::string& path) {
        std::string file_path = "../public/uploads/" + path;
        res.set_static_file_info_unsafe(file_path);
        res.end();
    });

    // Start the server on port 18080 with multithreading enabled.
    app.port(18080).multithreaded().run();
}