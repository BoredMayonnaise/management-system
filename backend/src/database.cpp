#include "database.h"
#include "schema_init.h"     
#include "default_user_init.h" 
#include <iostream>

Database::Database(const std::string& db_path) : db_path_(db_path), db_(nullptr) {
    int rc = sqlite3_open(db_path_.c_str(), &db_);
    if (rc) {
        std::cerr << "Can't open database: " << sqlite3_errmsg(db_) << std::endl;
        db_ = nullptr; 
    } else {
        std::cout << "Opened database successfully: " << db_path_ << std::endl;
    }
}

Database::~Database() {
    if (db_) {
        sqlite3_close(db_);
        std::cout << "Closed database: " << db_path_ << std::endl;
    }
}

bool Database::init() {
    if (!db_) {
        std::cerr << "Database not open. Cannot initialize schema or default users." << std::endl;
        return false;
    }

    initializeSchema(db_);
    initDefaultUsers(db_);
    
    return true;
}

sqlite3* Database::getDb() const {
    return db_;
}