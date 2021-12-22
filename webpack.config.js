const path = require('path')
const outputPath = path.resolve(__dirname, 'dist')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/** @type import('webpack').Configuration */
module.exports = (env) => ({
  // Make webpack less verbose in development
  stats: env.production ? 'normal' : 'minimal',
  // setting mode to development prevents webpack from minifying the bundle
  mode: env.production ? 'production' : 'development',
  devtool: env.production ? 'source-map' : 'inline-source-map',

  entry: path.resolve(__dirname, 'src/index.tsx'),
  output: {
    // this is good enough for now. Might change later to read version from package.json
    filename: '[name].[contenthash].js',
    path: outputPath,
    clean: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },
  // Development server config
  devServer: {
    static: outputPath,
    host: '0.0.0.0',
    port: '4000',
    hot: true
  },
  module: {
    rules: [{
      // Use babel to compile typescript
      test: /\.(ts|js)x?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  optimization: {
    // Split third party libraries into their own separate chunk
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        // Extract libraries in a separate chunk called vendors
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
})
