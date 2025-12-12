#pragma once

#include <string>
#include <vector>
#include <sstream>
#include <iomanip>
#include <array>
#include <cstring>

/*
* SHA-256 implementation by 'zedwood'
* Source: https://github.com/zedwood/sha256
* License: Public Domain
*/

class SHA256 {
public:
    SHA256();
    void update(const uint8_t *data, size_t length);
    void update(const std::string &data);
    uint8_t *digest();
    static std::string toString(const uint8_t *digest);

private:
    uint8_t m_data[64];
    uint32_t m_blocklen;
    uint64_t m_bitlen;
    uint32_t m_state[8]; // A, B, C, D, E, F, G, H

    static uint32_t rotr(uint32_t x, uint32_t n);
    static uint32_t ch(uint32_t x, uint32_t y, uint32_t z);
    static uint32_t maj(uint32_t x, uint32_t y, uint32_t z);
    static uint32_t sig0(uint32_t x);
    static uint32_t sig1(uint32_t x);
    static uint32_t capsig0(uint32_t x);
    static uint32_t capsig1(uint32_t x);

    void transform();
    void pad();
    void revert(uint8_t *hash);

    static const uint32_t k[64];
};

inline SHA256::SHA256() : m_blocklen(0), m_bitlen(0) {
    m_state[0] = 0x6a09e667;
    m_state[1] = 0xbb67ae85;
    m_state[2] = 0x3c6ef372;
    m_state[3] = 0xa54ff53a;
    m_state[4] = 0x510e527f;
    m_state[5] = 0x9b05688c;
    m_state[6] = 0x1f83d9ab;
    m_state[7] = 0x5be0cd19;
}

inline void SHA256::update(const uint8_t *data, size_t length) {
    for (size_t i = 0; i < length; i++) {
        m_data[m_blocklen++] = data[i];
        if (m_blocklen == 64) {
            transform();
            m_blocklen = 0;
            m_bitlen += 512;
        }
    }
}

inline void SHA256::update(const std::string &data) {
    update(reinterpret_cast<const uint8_t*>(data.c_str()), data.size());
}

inline uint8_t *SHA256::digest() {
    uint8_t *hash = new uint8_t[32];
    pad();
    revert(hash);
    return hash;
}

inline std::string SHA256::toString(const uint8_t *digest) {
    std::stringstream s;
    s << std::setfill('0') << std::hex;
    for (uint8_t i = 0; i < 32; i++) {
        s << std::setw(2) << static_cast<unsigned int>(digest[i]);
    }
    return s.str();
}

inline void SHA256::transform() {
    uint32_t w[64];
    uint32_t a = m_state[0];
    uint32_t b = m_state[1];
    uint32_t c = m_state[2];
    uint32_t d = m_state[3];
    uint32_t e = m_state[4];
    uint32_t f = m_state[5];
    uint32_t g = m_state[6];
    uint32_t h = m_state[7];

    for (int i = 0; i < 16; i++) {
        w[i] = (m_data[4 * i] << 24) | (m_data[4 * i + 1] << 16) | (m_data[4 * i + 2] << 8) | m_data[4 * i + 3];
    }
    for (int i = 16; i < 64; i++) {
        w[i] = sig1(w[i - 2]) + w[i - 7] + sig0(w[i - 15]) + w[i - 16];
    }

    for (int i = 0; i < 64; i++) {
        uint32_t t1 = h + capsig1(e) + ch(e, f, g) + k[i] + w[i];
        uint32_t t2 = capsig0(a) + maj(a, b, c);
        h = g;
        g = f;
        f = e;
        e = d + t1;
        d = c;
        c = b;
        b = a;
        a = t1 + t2;
    }
    m_state[0] += a;
    m_state[1] += b;
    m_state[2] += c;
    m_state[3] += d;
    m_state[4] += e;
    m_state[5] += f;
    m_state[6] += g;
    m_state[7] += h;
}

inline void SHA256::pad() {
    uint64_t i = m_blocklen;
    uint8_t end = (m_blocklen < 56) ? (56 - m_blocklen) : (64 - m_blocklen + 56);

    m_data[i++] = 0x80;
    while (i < 64) {
        m_data[i++] = 0x00;
    }
    if (m_blocklen >= 56) {
        transform();
        memset(m_data, 0, 56);
    }
    
    m_bitlen += m_blocklen * 8;
    m_data[63] = static_cast<uint8_t>(m_bitlen);
    m_data[62] = static_cast<uint8_t>(m_bitlen >> 8);
    m_data[61] = static_cast<uint8_t>(m_bitlen >> 16);
    m_data[60] = static_cast<uint8_t>(m_bitlen >> 24);
    m_data[59] = static_cast<uint8_t>(m_bitlen >> 32);
    m_data[58] = static_cast<uint8_t>(m_bitlen >> 40);
    m_data[57] = static_cast<uint8_t>(m_bitlen >> 48);
    m_data[56] = static_cast<uint8_t>(m_bitlen >> 56);
    transform();
}

inline void SHA256::revert(uint8_t *hash) {
    for (int i = 0; i < 4; i++) {
        hash[i] = (m_state[0] >> (24 - i * 8)) & 0xff;
        hash[i + 4] = (m_state[1] >> (24 - i * 8)) & 0xff;
        hash[i + 8] = (m_state[2] >> (24 - i * 8)) & 0xff;
        hash[i + 12] = (m_state[3] >> (24 - i * 8)) & 0xff;
        hash[i + 16] = (m_state[4] >> (24 - i * 8)) & 0xff;
        hash[i + 20] = (m_state[5] >> (24 - i * 8)) & 0xff;
        hash[i + 24] = (m_state[6] >> (24 - i * 8)) & 0xff;
        hash[i + 28] = (m_state[7] >> (24 - i * 8)) & 0xff;
    }
}

inline uint32_t SHA256::rotr(uint32_t x, uint32_t n) { return (x >> n) | (x << (32 - n)); }
inline uint32_t SHA256::ch(uint32_t x, uint32_t y, uint32_t z) { return (x & y) ^ (~x & z); }
inline uint32_t SHA256::maj(uint32_t x, uint32_t y, uint32_t z) { return (x & y) ^ (x & z) ^ (y & z); }
inline uint32_t SHA256::sig0(uint32_t x) { return rotr(x, 7) ^ rotr(x, 18) ^ (x >> 3); }
inline uint32_t SHA256::sig1(uint32_t x) { return rotr(x, 17) ^ rotr(x, 19) ^ (x >> 10); }
inline uint32_t SHA256::capsig0(uint32_t x) { return rotr(x, 2) ^ rotr(x, 13) ^ rotr(x, 22); }
inline uint32_t SHA256::capsig1(uint32_t x) { return rotr(x, 6) ^ rotr(x, 11) ^ rotr(x, 25); }

// Helper function to make it easy to call
inline std::string sha256(const std::string& input) {
    SHA256 sha;
    sha.update(input);
    uint8_t* digest = sha.digest();
    std::string hash_str = SHA256::toString(digest);
    delete[] digest; // Important: free the memory!
    return hash_str;
}