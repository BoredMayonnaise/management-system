#include "default_user_init.h"
#include "sqlite3.h"
#include "utils.h" // For hashPassword and generateSalt
#include <iostream>
#include <string>

void initDefaultUsers(sqlite3* db) {
    char *err_msg = 0;
    std::string default_user_id = "admin";
    std::string default_password = "password"; // Use a strong password in production
    std::string default_role = "admin";

    // Check if the default user already exists
    std::string check_query = "SELECT COUNT(*) FROM users WHERE id = ?;";
    sqlite3_stmt* stmt;
    sqlite3_prepare_v2(db, check_query.c_str(), -1, &stmt, nullptr);
    sqlite3_bind_text(stmt, 1, default_user_id.c_str(), -1, SQLITE_STATIC);

    int count = 0;
    if (sqlite3_step(stmt) == SQLITE_ROW) {
        count = sqlite3_column_int(stmt, 0);
    }
    sqlite3_finalize(stmt);

    if (count == 0) {
        // User does not exist, so insert
        std::string salt = generateSalt(16); // Generate a 16-character salt
        std::string hashed_password = hashPassword(default_password, salt);

        std::string insert_sql = "INSERT INTO users (id, password_hash, salt, role) VALUES (?, ?, ?, ?);";
        sqlite3_prepare_v2(db, insert_sql.c_str(), -1, &stmt, nullptr);
        sqlite3_bind_text(stmt, 1, default_user_id.c_str(), -1, SQLITE_STATIC);
        sqlite3_bind_text(stmt, 2, hashed_password.c_str(), -1, SQLITE_STATIC);
        sqlite3_bind_text(stmt, 3, salt.c_str(), -1, SQLITE_STATIC);
        sqlite3_bind_text(stmt, 4, default_role.c_str(), -1, SQLITE_STATIC);

        int rc = sqlite3_step(stmt);
        if (rc != SQLITE_DONE) {
            std::cerr << "SQL error (insert default user): " << sqlite3_errmsg(db) << std::endl;
        } else {
            std::cout << "Default admin user inserted successfully." << std::endl;
        }
        sqlite3_finalize(stmt);
    } else {
        std::cout << "Default admin user already exists." << std::endl;
    }
}