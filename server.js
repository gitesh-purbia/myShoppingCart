const serverFactory = require('spa-server');

const server = serverFactory.create({
  path: './dist',
  port: process.env.PORT || 9000,
  fallback: 'index.html'
});

server.start();
