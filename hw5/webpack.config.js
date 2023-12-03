// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require('html-webpack-plugin')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('webpack')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env) => {
  const scssLoader = {
    test: /\.s[ac]ss$/i, //   Порядок важен!!!!
    use: [
      // Creates `style` nodes from JS strings
      //   "style-loader",
      // Creates `style` nodes from JS strings
      'style-loader',
      // Translates CSS into CommonJS
      'css-loader',
      // Compiles Sass to CSS
      'sass-loader'
    ]
  }
  const htmlLoader = {
    test: /\.(html)$/i,
    use: ['html-loader']
  }

  const tsLoader = {
    // rs-loader умеет работать с JSX
    // если б мы не использовали ts : нужен был бы babel-loader

    test: /\.tsx?$/, // рег выражение
    use: 'ts-loader', // название loader
    exclude: /node_modules/ // то, что мы не обрабатываем (тоже рег выраж)
  }

  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource'
  }

  const svgrLoader = {
    test: /\.svg$/i,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: 'convertColors',
                params: {
                  currentColor: true
                }
              }
            ]
          }
        }
      }
    ]
  }
  return {
    mode: env.mode ?? 'development',

    entry: path.resolve(__dirname, 'src/app', 'index.ts'),
    module: {
      rules: [
        scssLoader, htmlLoader, tsLoader, assetLoader, svgrLoader
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].[contenthash].js',
      clean: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'index.html')
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css'
      }),
      new webpack.ProgressPlugin()
    ],
    devServer: {
      port: env.port ?? 5000,
      open: true
    }
  }
}
