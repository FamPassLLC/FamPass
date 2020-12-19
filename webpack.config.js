const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const assets = {
    mode: process.env.NODE_ENV,
    entry: {
        src: './client/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.s?css/,
                use: [
                    'style-loader', 
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: false,
                        },
                    }
                ]
            }, 
        ]
    },
    devServer: {
        publicPath: '/',
        contentBase: path.resolve(__dirname, 'build'),
        proxy: {
            '/api': 'http://localhost:3000'
        }
    }
}

module.exports = assets;