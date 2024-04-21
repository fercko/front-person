/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        google_key: "",
        url_front: 'http://localhost:3001',
        url_back: 'http://localhost:8080/persona-app/',
        project_title_head: 'Peronas',
        project_title_topbar: 'Peronas',
        topbar_logo: "/vercel.svg",
        icon: "/next.svg",
    }
};

module.exports = nextConfig
