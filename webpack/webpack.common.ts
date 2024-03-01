import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import AppConfig from '../src/config.json';
import { allowedConfigs, filterConfig } from '../src/config';

const communicationKeys = {
  ...AppConfig.common,
  ...AppConfig.communication,
};
const platformKeys = {
  ...AppConfig.platform,
};

const commonConfig = {
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[contenthash].bundle.js',
    publicPath: '/',
    globalObject: 'self',
  },
  entry: path.resolve(__dirname, '..', './src/index.tsx'),
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(?:ico|png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
        type: 'asset/inline',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: 'src/assets/favicon.ico',
      hash: true, //cache busting
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      'process.env.communication': filterConfig(
        communicationKeys,
        allowedConfigs.communication
      ),
      'process.env.platform': filterConfig(
        platformKeys,
        allowedConfigs.platform
      ),
    }),
  ],
};

export default commonConfig;
