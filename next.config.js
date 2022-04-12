/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        ...this.env,
        MONGODB_URI: "mongodb://localhost:27017/",
        DB_NAME: "wansport",
        SECRET_KEY: "SECRET_KEY"
    }
}

module.exports = nextConfig
