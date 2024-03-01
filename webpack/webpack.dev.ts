import path from 'path';
import webpack from 'webpack';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import AppConfig from '../src/config.json';

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    static: path.join(__dirname, 'build'),
    // historyApiFallback: true,
    port:  8000,
    allowedHosts: [AppConfig.communication.appUrl || '*'],
    open: true,
    // hot: true,
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('Tata 1mg Dev'),
    }),
  ],
};
