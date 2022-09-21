import { createProxyMiddleware } from 'http-proxy-middleware';

export default function (app) {
  app.use(
    createProxyMiddleware(
      '/api', {
      target: 'http://43.201.34.118:3306',
      changeOrigin: true,
    })
  );
};