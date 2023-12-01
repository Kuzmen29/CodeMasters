const path = require ('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
    return {
        mode : env.mode ?? 'development',

        entry : path.resolve(__dirname, 'src/app', 'index.ts'),
        module: {
            rules: [
            {
              test: /\.s[ac]ss$/i,
              use: [
               MiniCssExtractPlugin.loader,

                "css-loader",

                "sass-loader",
              ],
            },
            {
              test: /\.tsx?$/,
              use: 'ts-loader', 
              exclude: /node_modules/, 
            },
            {
              test: /\.html$/i,
              loader: "html-loader",
              options: {
                sources: {
                  list: [
                    {
                      tag: "img",
                      attribute: "data-src",
                      type: "src",
                    },
                  ],
                },
              },
            },
            {
              test: /\.(png|jpe?g|gif)$/i,
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
              },
            },
            ],
          },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        output : {
            path : path.resolve(__dirname, 'build'),
            filename : '[name].[contenthash].js', 
            clean : true, 
        },
        plugins: [
            new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html'),
        }),
        new MiniCssExtractPlugin({
          filename : 'css/[name].[contenthash:8].css',
          chunkFilename : 'css/[name].[contenthash:8].css',
      }),
        new webpack.ProgressPlugin()
    ],
    devServer : {
      port: env.port ?? 5000,
      open: true,}
    }
}