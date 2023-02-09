const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: {
    main: './src/bin/server.ts',
  },
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    fallback: {
      fs: false,
      net: false,
    },
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@calculator': path.resolve(__dirname, 'src/calculator'),
      '@config': path.resolve(__dirname, 'src/config'),
      '@common': path.resolve(__dirname, 'src/common'),
      '@feed': path.resolve(__dirname, 'src/feed'),
      '@loader': path.resolve(__dirname, 'src/loader'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: path.resolve(__dirname, 'node_modules'),
      },
      { test: /\.(abi|bin)$/i, loader: 'file-loader' },
    ],
  },
  node: {
    __dirname: true,
  },
  devtool: 'source-map',
};
