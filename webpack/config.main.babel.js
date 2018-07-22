import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ReloadPlugin from 'reload-html-webpack-plugin'

export const APP_DIR = path.join(__dirname, '..')
export const SRC_DIR = path.join(APP_DIR, 'src')

// eslint-disable-next-line
console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`)
// eslint-disable-next-line
console.log(`Using config: ./config.${process.env.NODE_ENV}.js`)

export default {
  devtool: 'source-map',
  entry: ['babel-polyfill', path.join(SRC_DIR, 'index.js')],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        options: {
          compact: true,
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.scss/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.ejs$/,
        loader: 'ejs-loader',
      },
      {
        test: /\.(jpe*g|png|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './dist',
    port: 3000,
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
    }),
    new webpack.ProvidePlugin({
      lodash: 'lodash',
      Promise: 'bluebird',
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.ejs'),
      title: 'Diagrams app',
    }),
    new webpack.NamedModulesPlugin(),
    new ReloadPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  output: {
    pathinfo: true,
    path: path.join(APP_DIR, 'build'),
    filename: '[name].js',
  },
}
