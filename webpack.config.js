const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

let config = {
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },

      {
        test: /\.sass$/,
        use: [ 'style-loader', MiniCssExtractPlugin.loader, 'css-loader', {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: (loader) => [
              require('autoprefixer')(),
              require('css-mqpacker')
            ]
          }
        }, 'sass-loader']
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', MiniCssExtractPlugin.loader, 'css-loader', {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: (loader) => [
              require('autoprefixer')(),
              require('css-mqpacker')
            ]
          }
        }]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/index.html',
      filename: 'index.html'
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
};

let prodRules = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader"
    }
  },

  {
    test: /\.sass$/,
    use: [ 'style-loader', MiniCssExtractPlugin.loader, 'css-loader', {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: (loader) => [
          require('cssnano')(),
          require('autoprefixer')(),
          require('css-mqpacker')
        ]
      }
    }, 'sass-loader']
  },
  {
    test: /\.css$/,
    use: [ 'style-loader', MiniCssExtractPlugin.loader, 'css-loader', {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: (loader) => [
          require('cssnano')(),
          require('autoprefixer')(),
          require('css-mqpacker')
        ]
      }
    }]
  }
]

module.exports = (env, argv) => {
  if (argv.mode === 'production') {
    config.plugins.push(
      new CleanWebpackPlugin('dist', {})
    );
    config.module.rules = prodRules;
  }
  return config;
}