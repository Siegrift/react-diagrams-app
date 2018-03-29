import webpack from 'webpack'
import ReloadPlugin from 'reload-html-webpack-plugin'

export default {
  devtool: 'source-map',
  plugins: [
    new webpack.NamedModulesPlugin(),
    new ReloadPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
}
