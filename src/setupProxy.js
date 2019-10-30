const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/api', { target: 'https://movie.douban.com/' ,changeOrigin: true, pathRewrite: {'^/api': ''}, secure: false}));
    // app.use(proxy('/test', { target: 'http://localhost:3000' }));
    // 省略...
};
// ,
// // "devServer": {
// //     "historyApiFallback": true,
// //         "host": "0.0.0.0",
// //         "proxy": {
// //         "/api": {
// //             "target": "https://api.mch.weixin.qq.com",
// //                 "pathRewrite": {"^/api/weixin": ""},
// //             "secure": false,
// //                 "changeOrigin": true
// //         }
// //     }
// // }
