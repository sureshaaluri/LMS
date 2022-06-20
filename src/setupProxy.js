// const proxy = require('http-proxy-middleware');
// module.exports = function(app){
//     app.use(proxy('/api/v1/issuer/authenticate',{target:"https://api-tenant.stage.digitaltrust.net"}))
//     app.use(proxy('/api/v1/dap/digital-address/authenticate',{target:"https://api-dap.stage.digitaltrust.net"}))
// }

const { createProxyMiddleware } = require('http-proxy-middleware');
 
module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api1', {
      target: 'https://api-tenant.stage.digitaltrust.net', // API endpoint 1
      changeOrigin: true,
      pathRewrite: {
        "^/api1": "",
      },
      headers: {
        Connection: "keep-alive"
      }
    })
  );
  app.use(
    createProxyMiddleware('/api2', {
      target: 'https://api-dap.stage.digitaltrust.net', // API endpoint 2
      changeOrigin: true,
      pathRewrite: {
        "^/api2": "",
      },
      headers: {
        Connection: "keep-alive"
      }
    })
  );
  app.use(
    createProxyMiddleware('/api3', {
      // target: 'http://127.0.0.1:5000', // API endpoint 2 for Local
      target: 'http://13.67.200.85:3000', // Azure Server
      changeOrigin: true,
      pathRewrite: {
        "^/api3": "",
      },
      headers: {
        Connection: "keep-alive"
      }
    })
  );

  app.use(
    createProxyMiddleware('/api4', {
      target: 'http://127.0.0.1:4000', // API endpoint 2 for Local
      // target: 'http://13.67.200.85:3000', // Azure Server
      changeOrigin: true,
      pathRewrite: {
        "^/api4": "",
      },
      headers: {
        Connection: "keep-alive"
      }
    })
  );
}
