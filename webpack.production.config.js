var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: path.resolve(__dirname, 'app/index.js'),
    // 将第三方依赖 单独打包
    vendor: [
        'react',
        'react-dom',
        'react-router',
        'redux',
        'es6-promise',
        'whatwg-fetch',
        'immuable'
    ],
    output: {
        path: __dirname + '/build',
        filename: "[name].[chunkhash:8].js",
        publicPath: '/'
    },
    resolve: {
         extensions:['', '.js','.jsx']
    },
    module: { //一些loader 处理器
        rules: [
            {
                enforce: "pre",
                test: /(\.jsx|.js)$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
            },
            { //处理 jsx
                test: /(\.jsx|.js)$/,
                use: {
                    loader: 'babel-loader',
                    option: {
                        presets: [
                            "es2015", "react"
                        ]
                    }
                },
                exclude: /(node_modules|bower_components)/,
            },
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader", "postcss-loader"],
                exclude: /(node_modules|bower_components)/,
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", "postcss-loader"],
                exclude: /(node_modules|bower_components)/,
            },
            {
                test: /\.(png|gif|jpg|jpeg|bmp)$/i,
                use: ["url-loader?limit=5000"],
                exclude: /(node_modules|bower_components)/,
            },
            {
                test: /\.(png|woff|woff2|svg|ttf|eot)($|\?)/i,
                use: ["url-loader?limit=5000"],
                exclude: /(node_modules|bower_components)/,
            }
        ]
    },
    plugins: [
        // html 模板插件
        new HtmlWebpackPlugin({
            template: __dirname + '/app/index.tmpl.html'
        }),

        // 定义为生产环境，编译 React 时压缩到最小
        new webpack.DefinePlugin({
               'process.env':{
                 'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
               }
        }),

         // 分离CSS和JS文件
         new ExtractTextPlugin('[name].[chunkhash:8].css'),

          // 提供公共代码
         new webpack.optimize.CommonsChunkPlugin({
           name: 'vendor',
           filename: '[name].[chunkhash:8].js'
         }),


        // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
        new webpack.DefinePlugin({
          __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
        })
    ]
}
