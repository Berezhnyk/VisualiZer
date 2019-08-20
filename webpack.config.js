const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')

const NODE_ENV = process.env.NODE_ENV || 'development';
const DEBUG = NODE_ENV === 'development';

module.exports = (function (options) {
  console.log('Current environment: ' + NODE_ENV);

  const plugins = [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      title: 'Demo for Visualizer library',
      template: './assets/example.html',
      files: {
        js: ["visualizer"]
      },
      polyfills: './polyfills.js'
    })
  ];
  const optimization = {
    minimizer: [],
    sideEffects: false
  };

  if (!DEBUG) {
    optimization.minimizer.push(new UglifyJsPlugin())
  }

  return {
    context: __dirname + '/src',
    mode: DEBUG ? 'development' : 'production',
    entry: './index.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: DEBUG ? "vizualizer.js" : "vizualizer.min.js",
      library: "VizualizerModule",
      libraryTarget: 'amd'
    },

    devtool: DEBUG ? 'source-map' : false,
    watch: DEBUG,
    watchOptions: {
      aggregateTimeout: 100
    },
    module: {
      rules: [{        
        test: /\.ts$/,
        loader: "ts-loader",
        sideEffects: false
      }]
    },

    plugins: plugins,
    optimization: optimization,
    resolve: {
      extensions: ['.ts', '.js', '.json']
    }
  }
})();