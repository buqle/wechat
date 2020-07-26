module.exports = {
  proxy: {
    '/api': {
      target: 'http://tf3bjz.natappfree.cc',  // 接口域名
      changeOrigin: true,  //是否跨域
      pathRewrite: {
        '^/api': ''   //需要rewrite的,
      }
    },
    '/yxlsccc': {
      target: 'http://61.190.54.189:9001',  // 接口域名
      changeOrigin: true,  //是否跨域
      pathRewrite: {
        '^/yxlsccc': ''   //需要rewrite的,
      }
    }
  }
}
