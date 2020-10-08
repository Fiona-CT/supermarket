module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'views': '@/views',
        'components': '@/components',
        'network': '@/network',
        'common': '@/common',
        'assets': '@/assets',
      },
    },
    devServer: {
      // 由之前的 'localhost'改为如下，端口默认8080
      port: 9092, // 端口号
      host: "0.0.0.0",
      https: false, // https:{type:Boolean}
      open: true, //配置自动启动浏览器
      // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
      /*proxy: {
        "/api": {
          target: "<url>",
          ws: true,
          changeOrigin: true
        },
        "/foo": {
          target: "<other_url>"
        }
      }*/ // 配置多个代理
    }
  }
}