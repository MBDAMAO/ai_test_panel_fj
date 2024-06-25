const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: "./",
  transpileDependencies: true,
  devServer: {
    host: "127.0.0.1",
    port: 8080,
    open: true,
    proxy: {
      "/api1": {
        target: "http://159.138.147.88:8000/", //接口域名1
        changeOrigin: true,
        ws: true,
        secure: true,
        pathRewrite: {
          "^/api1": "",
        },
      },
      "/api2": {
        target: "http://159.138.147.88:8000/", //接口域名2
        changeOrigin: true,
        ws: true,
        secure: true,
        pathRewrite: {
          "^/api2": "",
        },
      },
    },
    client: {
      overlay: false,
    },
  },
});
