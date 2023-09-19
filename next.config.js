const path = require("path");

module.exports = {
  trailingSlash: true,
  exportPathMap: async () => {
    return {
      "/home": { page: "/components/Home" },
      "/simulation": { page: "/components/Home" },
      "/sectors": { page: "/components/Home" },
      "/revenue": { page: "/components/Home" },
      "/performance": { page: "/components/Home" },
      "/comparision": { page: "/components/Home" },
      "/sp500": { page: "/components/Home" },
      "/login": { page: "/components/Home" },
      "/about": { page: "/components/Home" },
      "/top/:num/:type": { page: "/components/Home" },
      "/companydetails/:name": { page: "/components/Home" },
    };
  },
};
