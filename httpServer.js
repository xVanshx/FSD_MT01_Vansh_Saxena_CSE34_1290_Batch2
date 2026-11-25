const http = require('http');
const app = require('./expressApp');

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Product Inventory API server running on port ${PORT}`);
});

module.exports = server;
