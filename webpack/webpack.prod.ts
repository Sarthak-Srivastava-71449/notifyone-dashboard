import path from 'path';
import webpack from 'webpack';

module.exports = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '..', './build'),
    filename: '[name].[contenthash].communication.js',
    publicPath: '/communication/', // The ending slash is only to be used in production
    globalObject: 'self',
    clean: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('Tata 1mg'),
    }),
  ],
};
