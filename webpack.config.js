const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const { NODE_ENV } = process.env;
const mode = NODE_ENV ? "production" : "development";

const baseConfig = {
  mode,
  devtool: mode === "production" ? "source-map" : "inline-source-map",
  resolve: {
    extensions: [".js", ".marko"],
    modules: [
      path.resolve(__dirname, "node_modules/"),
      path.resolve(__dirname, "src/js/"),
      path.resolve(__dirname, "src/marko/")
    ]
  },
  module: {
    rules: [
      {
        test: /\.marko$/,
        loader: "@marko/webpack/loader"
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: {
          plugins: ["@babel/transform-runtime"],
          presets: ["@babel/preset-env"],
          cacheDirectory: true,
          sourceType: "unambiguous"
        },
        include: [path.resolve(__dirname, "src/js/")],
        exclude: /node_modules/
      }
    ]
  }
};

const browserConfig = {
  ...baseConfig,
  entry: {
    main: "./src/js/init.js"
  },
  optimization: {
    minimize: false
  },
  output: {
    ...baseConfig.output,
    filename: "[name].[contenthash:8].js",
    path: path.join(__dirname, "dist/")
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.browser": true
    }),
    new HtmlWebpackPlugin({
      title: "Proof",
      chunks: ["main"],
      filename: "index.html",
      template: "src/html/index.html"
    })
  ]
};

module.exports = browserConfig;
