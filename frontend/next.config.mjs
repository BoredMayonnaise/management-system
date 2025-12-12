/** @type {import('next').NextConfig} */


const backendUrl = new URL(process.env.BACKEND_INTERNAL_URL || 'http://localhost:18080');

const nextConfig = {
  async rewrites() {
    const url = process.env.BACKEND_INTERNAL_URL || 'http://localhost:18080';
    console.log(`> [Next.js] Proxying /api requests to: ${url}`);

    return [
      {
        source: '/api/:path*',
        destination: `${url}/api/:path*`,
      },
    ];
  },

  // Allow loading images from the Backend URL
  images: {
    remotePatterns: [
      {
        protocol: backendUrl.protocol.replace(':', ''), // e.g., 'http'
        hostname: backendUrl.hostname,
        port: backendUrl.port,
        pathname: '/uploads/**', // For static uploads
      },
      {
        protocol: backendUrl.protocol.replace(':', ''),
        hostname: backendUrl.hostname,
        port: backendUrl.port,
        pathname: '/api/employees/*/photo', // For dynamic employee photos
      },
    ],
  },
};

export default nextConfig;
