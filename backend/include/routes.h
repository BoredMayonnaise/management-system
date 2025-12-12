#pragma once
#include "crow.h"
#include "database.h"
#include "crow/middlewares/cors.h"
#include "crow/middlewares/cookie_parser.h"
#include "crow/middlewares/session.h"

using Session = crow::SessionMiddleware<crow::InMemoryStore>;

void setupRoutes(crow::App<crow::CORSHandler, crow::CookieParser, Session>& app, Database& db);