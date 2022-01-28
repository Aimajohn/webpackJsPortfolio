/** @type {import('webpack').Configuration} */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const DotEnv = require('dotenv-webpack')
module.exports = {
    mode: 'production',
    entry: './src',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.[contenthash].js',
        assetModuleFilename: 'assets/[hash][ext][query]',
        clean: true
    },
    resolve:{
        extensions: ['.js'],
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/'),
        }
    },
    module:{
        rules:[{
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        },
        {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, 
            'css-loader'],
        },
        {
            test: /\.png$/,
            type: 'asset/resource',
            generator:{
                filename: "assets/images/[name][contenthash][ext]"
            }
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: "asset/resource",
            generator: {
                filename: "assets/fonts/[name][ext]"
            }
        }
    ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "assets/styles/[name].[contenthash].css"
        }),
        // new CopyPlugin({
        //     patterns:[
        //         {
        //             from: path.resolve(__dirname, "src", "assets/images"),
        //             to: "assets/images"
        //         }
        //     ]
        // })
        new DotEnv()
    ],
    optimization : {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ]
    },
    
}