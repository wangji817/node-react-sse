// webpack.base.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, '../src/index.js'), // 入口文件
    // 打包文件出口
    output: {
        filename: 'static/js/[name].js', // 每个输出js的名称
        path: path.join(__dirname, '../dist'), // 打包结果输出路径
        clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
        publicPath: '/' // 打包后文件的公共前缀路径
    },
    resolve: {
        extensions: ['.js', '.json', '.scss', '.css'],
        alias: {
            '@': path.resolve(__dirname, '../src/'),
            '@util': path.resolve(__dirname, '../src/util/'),
            '@plugins': path.resolve(__dirname, '../src/plugins/'),
        }
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    'style-loader', // 将CSS添加到DOM中
                    'css-loader', // 将CSS转换成CommonJS模块
                    'sass-loader' // 将Sass编译成CSS，需要安装sass-loader和sass
                ]
            },
            {
                test: /.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'), // 模板取定义root节点的模板
            inject: true, // 自动注入静态资源
        })
    ]
}