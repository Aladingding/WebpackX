
const path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserWebpackPlugin = require('open-browser-webpack-plugin');

const config = {
    /*
    * entry 有多种语法，字符串，数组都可以
    * string : './src/index.jsx'  字符串语法
    * object : {  app: './src/index.jsx',  common: [ 'react', 'react-dom'] }
    * */
    entry:　{
        app: './src/index.jsx',
        common: [ 'react', 'react-dom']
    },
    /*
     * output 基本同entry
     *
     * */
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules:[
            // js文件处理
            {
                test:/\.(js|jsx|es6)$/, // 查找匹配的文件格式，注意这里是一个正则表达式，不要用字符串引号包裹起来
                exclude: /(node_modules|bower_components)/, //不参与打包的模块
                // use: [   // 如果loader间存在依赖，则顺序保持严格先后顺序
                //     'babel-loader','babel-preset-react-loader'
                // ]
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            // 样式文件处理
            {
                test:/\.css$/, // 查找匹配的文件格式，注意这里是一个正则表达式，不要用字符串引号包裹起来
                use: [   // 如果loader间存在依赖，则顺序保持严格先后顺序
                    'style-loader',
                    'css-loader'
                ]
            },
            // 图片资源处理
            {
                test: /\.(png|svg|jpg|gif)$/, // 格式文件要严格匹配,如果出现了该格式，但是配置没写则可会报错
                use: [
                    'file-loader' // file-loader 和 url-loader 可以接收并加载任何文件,图片，字体等等
                ]
            },
            // 字体文件处理
            {
                test: /\.(woff|woff2|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            // cvs文件处理
            {
                test: /\.(cvs|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            // xml文件处理
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: 'Webpack && React Practice',
            template: './dist/index.html',
        }),
        new OpenBrowserWebpackPlugin({
            browser: 'Chrome',
            url: 'http://localhost:7788'
        }),
        new Webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        port:'7788',
        contentBase: "./dist", //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转
        inline: true, //实时刷新
        hot: true,  // 使用热加载插件 HotModuleReplacementPlugin
        proxy: {
            "/v1": {
                target:"https://200.200.200.50/",
                secure:false
            }
            // 'http://localhost:7788/api/*': {
            //     target:'https://200.200.200.50/v1/',
            //     changeOrigin: true,
            //     secure: false
            // }
            //
            // '/v1/*': {
            //     target: 'https://200.200.200.50/v1/',
            //     changeOrigin: true,
            //     secure: false
            // }
            // '/v1': {
            //     target: 'https://200.200.200.50/v1/',
            //     pathRewrite: {'^/api' : ''}
            // }
            // '/v1': {
            //     target: 'https://200.200.200.50/v1/',
            //     secure: false
            // }
        }
    }
};

module.exports = config;