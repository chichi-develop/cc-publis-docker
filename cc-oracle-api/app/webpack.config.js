const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: 'production',
  entry: './src/server/index.ts',
  target: 'node',
  externals: [nodeExternals()],
  devtool: 'inline-source-map',
  output: {
    filename: 'server.js',
    publicPath: 'dist'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [{ loader: 'ts-loader' }],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
}
