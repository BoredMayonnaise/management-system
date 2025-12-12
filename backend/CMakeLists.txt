#####################################
# Project configuration
#####################################
cmake_minimum_required(VERSION 3.15)
project(payroll_backend LANGUAGES CXX VERSION 1.0.0)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Use CPM to fetch dependencies
include(cmake/CPM.cmake)

CPMAddPackage(
    NAME jwt-cpp
    GITHUB_REPOSITORY thalhammer/jwt-cpp
    VERSION 0.7.0
)

#####################################
# Dependencies
#####################################

# Crow (header-only)
# If Crow is in include/, this makes a dummy interface target.
add_library(Crow INTERFACE)
target_include_directories(Crow INTERFACE
    ${CMAKE_CURRENT_SOURCE_DIR}/include
)
add_library(Crow::Crow ALIAS Crow)

# SQLite3
find_package(Threads REQUIRED)
find_library(SQLITE3_LIB sqlite3 REQUIRED)

#####################################
# Source files
#####################################
file(GLOB SRC_FILES
    src/app.cpp
    src/routes.cpp
    src/database.cpp
    src/seed_data.cpp
    src/schema_init.cpp
    src/default_user_init.cpp
    src/utils.cpp
)

#####################################
# Build target
#####################################
add_executable(server ${SRC_FILES})

# Link everything
target_link_libraries(server
    PRIVATE
        Crow::Crow
        jwt-cpp
        ${SQLITE3_LIB}
        Threads::Threads
)

# Include header files
target_include_directories(server
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

#####################################
# Output path
#####################################
set_target_properties(server PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}"
)

message(STATUS "✅ Payroll backend configured successfully")
