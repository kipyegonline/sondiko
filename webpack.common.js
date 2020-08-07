const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Webpack = require("webpack");
module.exports = {
  entry: "./src/pages/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  devtool: "source-map",
  mode: "development",
  resolve: {
    extensions: [".jsx", ".ts", ".js", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js|ts|tsx)$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./index.html" }),
    new Webpack.HotModuleReplacementPlugin({}),
  ],
};
