const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/post',
    createProxyMiddleware({
      target: 'http://localhost:5173',
      changeOrigin: true,
    })
  );
};
