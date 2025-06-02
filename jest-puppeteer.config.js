const { TestEnvironment } = require("jest-environment-jsdom");

module.exports = {
  launch: {
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-software-rasterizer',
      '--single-process',
      '--no-zygote',
    ],
  },
  testEnvironment: 'jsdom',
};