#include "utils.h"
#include "sha256.h"
#include <random>
#include <string>
#include <iostream> // For logging errors, remove in production
#include <chrono>

const uint32_t SHA256::k[64] = {
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
};

std::string generateSalt(int length) {
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> dis(0, 15);
    const char* hex_chars = "0123456789abcdef";

    std::string result;
    result.reserve(length);
    for (int i = 0; i < length; ++i) {
        result.push_back(hex_chars[dis(gen)]);
    }
    return result;
}

std::string hashPassword(const std::string& password, const std::string& salt) {
    std::string to_hash = password + salt;
    return sha256(to_hash);
}

std::string generateRandomDigits(int length) {
    thread_local std::mt19937 gen(std::random_device{}());
    thread_local std::uniform_int_distribution<> dis(0, 9);

    std::string result;
    result.reserve(length);
    for (int i = 0; i < length; ++i) {
        result.push_back('0' + dis(gen));
    }
    return result;
}

bool secure_compare(const std::string& a, const std::string& b) {
    if (a.length() != b.length()) {
        return false;
    }

    int result = 0;
    for (size_t i = 0; i < a.length(); ++i) {
        result |= (a[i] ^ b[i]);
    }

    return result == 0;
}

std::string generateTempPassword() {
    // Generate 8-character temporary password with letters and numbers
    const char chars[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const int length = 8;
    
    thread_local std::mt19937 gen(std::random_device{}());
    thread_local std::uniform_int_distribution<> dis(0, sizeof(chars) - 2);
    
    std::string result;
    result.reserve(length);
    for (int i = 0; i < length; ++i) {
        result.push_back(chars[dis(gen)]);
    }
    return result;
}

std::optional<jwt::decoded_jwt> verifyJwtToken(const std::string& token, const std::string& secret) {
    try {
        auto decoded_token = jwt::decode(token);
        jwt::verifier verifier = jwt::verify()
            .allow_algorithm(jwt::algorithm::hs256{secret}); // Only allow HS256 with our secret

        verifier.verify(decoded_token); // This will throw on invalid signature or claims

        return decoded_token;
    } catch (const jwt::verification_error& e) {
        std::cerr << "JWT Verification Error: " << e.what() << std::endl;
        return std::nullopt;
    } catch (const std::exception& e) {
        std::cerr << "JWT Decoding Error: " << e.what() << std::endl;
        return std::nullopt;
    }
}
