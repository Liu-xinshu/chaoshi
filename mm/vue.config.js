module.exports = {
    devServer: {
        proxy: {
            "/api": { //静态文件不需要代理，css html 
                target: "http://106.13.85.240:7002/", //baseurl
                changeOrigin: true, //是否跨域
                pathRewrite: { "^/api": "" } //  /api/user/login   /user/login
            }
        }
    }
}