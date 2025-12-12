#include "schema_init.h"
#include "sqlite3.h"
#include <iostream>

void initializeSchema(sqlite3* db) {
    char *err_msg = 0;
    
    // Create users table
    const char *create_users_sql = R"(
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY NOT NULL,
            password_hash TEXT NOT NULL,
            salt TEXT NOT NULL,
            role TEXT NOT NULL DEFAULT 'student'
        );
    )";

    int rc = sqlite3_exec(db, create_users_sql, 0, 0, &err_msg);
    if (rc != SQLITE_OK) {
        std::cerr << "SQL error (create users table): " << err_msg << std::endl;
        sqlite3_free(err_msg);
    } else {
        std::cout << "Users table created or already exists." << std::endl;
    }
}