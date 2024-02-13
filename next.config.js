module.exports = {
  reactStrictMode: false, // Disable strict mode ทำให้ drag and drop ได้
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/admin",
        destination: "/admin/category",
        permanent: true,
      },
    ];
  },
};
