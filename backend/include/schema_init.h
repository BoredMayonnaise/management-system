#ifndef SCHEMA_INIT_H
#define SCHEMA_INIT_H

#include "database.h"

// Forward declaration of Database class
class Database;

void initializeSchema(sqlite3* db);

#endif // SCHEMA_INIT_H