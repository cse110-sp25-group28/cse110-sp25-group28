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
  server: {
    command: 'npx http-server . -p 3000',
    port: 3000,
    launchTimeout: 10000,
    debug: true,
  },
};