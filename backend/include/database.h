#pragma once

#include "sqlite3.h"
#include <string>

class Database {
public:
    Database(const std::string& db_path);
    ~Database();

    bool init(); // Declaring the init method
    sqlite3* getDb() const;

private:
    std::string db_path_;
    sqlite3* db_;
};