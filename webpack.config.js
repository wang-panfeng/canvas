let htmlWebpckPlugin = require('html-webpack-plugin'); //该组件能将src下面提定的html文件与打包后在js文件打包在一起
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: './src/js/index.js', //入口文件
    output: {
        filename: "bundle.js", //出口文件名
        path: __dirname + "/dist" //出口文件目录
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            { test: /\.js$/, use: "babel-loader", exclude: /node_modules/ }
        ]
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new htmlWebpckPlugin({
            template: "./src/index.html",
            //filename:"" 设置生成在dist下面的html文件名称
        })
    ],
    devServer: { //给webpack-dev-server配置默认的环境
        host: "127.0.0.1",
        port: 8088
    },
};