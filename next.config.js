// next.config.js
module.exports = {
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
