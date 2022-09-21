const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware(
      '/api', {
      target: 'http://43.201.34.118:3306',
      changeOrigin: true,
    })
  );
};