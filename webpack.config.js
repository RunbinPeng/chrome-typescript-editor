
const { VueLoaderPlugin } = require('vue-loader')
const CopyPlugin = require("copy-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin")
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpack = require('webpack')

const path = require('path')

const isDevelopment = process.env.NODE_ENV === 'development'
const isAnalyzeMode = process.env.ANALYZE || false

const config = {
  entry: {
    vendor: path.resolve(__dirname, 'src/main.ts')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'template') }
      ]
    }),
    new MonacoWebpackPlugin({
      languages: ['typescript', 'javascript'], // ensure bundle this two languages type to lighten final size
    }),
    isDevelopment ? new webpack.HotModuleReplacementPlugin() : null,
    isAnalyzeMode ? new BundleAnalyzerPlugin() : null,
  ].filter(Boolean),
  optimization: isDevelopment ? null : {
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        }
      },
      extractComments: false,
    })],
  },
  module: {
    rules: [
      {
        test: /\.js/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader:'ts-loader',
            options: {
              transpileOnly: true,
            }
          }
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.s[ac]ss$/i,
        use: [ "vue-style-loader", "css-loader", "sass-loader" ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.ttf$/,
        use: ['file-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    publicPath: '/',
    port: 9000, // Visit localhost:9000/webpack-dev-server, and  You can see all files here
    hot: true,
  }
}

module.exports = config