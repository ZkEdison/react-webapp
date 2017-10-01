var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack')
var path = require("path")

module.exports = {
    entry: path.resolve(__dirname, 'app/index.jsx'), //入口文件
    output: { //输出文件
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    devServer: {
        //本地服务器加载的页面所在的目录
        contentBase: "./build",
        //不跳转 ？？
        historyApiFallback: true,
         //实时刷新
        inline: true,
         //使用热加载插件 HotModuleReplacementPlugin
        // hot: true
    },
    resolve: {
         extensions: ['*', '.js', '.json', '.less'], //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
    },
     //一些loader 处理器
    module: {
        rules: [
            // {
            //     enforce: "pre",
            //     test: /(\.jsx|.js)$/,
            //     exclude: /node_modules/,
			// 	use: {
			// 		loader: "eslint-loader",
			// 	}
            // },
             //处理 jsx
            {
                test: /(\.jsx|.js)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            "es2015", "react"
                        ]
                    }
                },
                exclude: /(node_modules|bower_components)/,
            },
            {
                test: /\.less$/,
				use: [
					{loader: 'style-loader'},
					{loader: 'css-loader'},
					{loader: 'less-loader'},
					{loader: 'postcss-loader'}
				],
                exclude: /(node_modules|bower_components)/,
            },
            {
                test: /\.css$/,
				use: [
					{loader: 'style-loader'},
					{loader: 'css-loader'},
					{loader: 'postcss-loader'}
				],
                exclude: /(node_modules|bower_components)/,
            },
            {
                test: /\.(png|gif|jpg|jpeg|bmp)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 5000
						}
					},
				],
                exclude: /(node_modules|bower_components)/,
            },
            {
                test: /\.(png|woff|woff2|svg|ttf|eot)($|\?)/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 5000
						}
					},
				],
                exclude: /(node_modules|bower_components)/,
            }
        ]
    },
    plugins: [
        // html 模板插件
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.html"
        }),

         // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
        new webpack.DefinePlugin({
             __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
        }),

        // 热加载插件
        //  new webpack.HotModuleReplacementPlugin(),
    ]
};
