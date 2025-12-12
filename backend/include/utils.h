#ifndef UTILS_H
#define UTILS_H

#include <string>
#include <optional>
#include <jwt-cpp/jwt.h>

std::string generateSalt(int length = 16);
std::string hashPassword(const std::string& password, const std::string& salt);
std::string generateRandomDigits(int length);
bool secure_compare(const std::string& a, const std::string& b);
std::string generateTempPassword();

std::optional<jwt::decoded_jwt> verifyJwtToken(const std::string& token, const std::string& secret);

#endif // UTILS_H