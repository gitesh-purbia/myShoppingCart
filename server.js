var serverFactory = require('spa-server');

var server = serverFactory.create({
  path: './dist',
  port: process.env.PORT || 5000,
  fallback: 'index.html'
});

server.start();
