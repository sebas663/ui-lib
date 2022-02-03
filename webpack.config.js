const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const nodeExternals = require('webpack-node-externals');

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    library: '@sebas663/ui-lib',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    publicPath: '/dist/', 
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.(ts|tsx|js)$/,
        exclude: /node_modules/,
      },
      {
        use: [
          'style-loader', 
          'css-loader',
          'sass-loader',
        ],
        test: /\.(css|scss|sass)$/,
        include: path.resolve(__dirname, './src'),
      },
      {
        type: 'asset',
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
};


