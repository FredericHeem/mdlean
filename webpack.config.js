"use strict";

const path = require("path");
const glob = require("glob");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const OUT_PATH = path.resolve("./build");
const PUBLIC_PATH = "/assets/";
const IS_DEV = process.env.LMD_ENV === "development";
const IS_PROD = process.env.LMD_ENV === "production";
const pkg = require('./package.json');

const LIFECYCLE_EVENT = process.env.npm_lifecycle_event;
if (LIFECYCLE_EVENT == "test" || LIFECYCLE_EVENT == "test:watch") {
  process.env.BABEL_ENV = "test";
}

module.exports = [
  {
    name: "components",
    entry: {
      button: [path.resolve("./src/button/index.js")]
      //base: [path.resolve('./index.js')],
    },

    externals: Object.keys(pkg.dependencies),
    output: {
      path: OUT_PATH,
      publicPath: PUBLIC_PATH,
      filename: "lmd.[name]." + (IS_PROD ? "min." : "") + "js",
      //libraryTarget: 'umd',
      library: ["ldc", "[name]"]
    },
    devServer: {
      disableHostCheck: true
    },
    devtool: IS_DEV ? "source-map" : false,
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
            cacheDirectory: true
          }
        }
      ]
    },
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: "static"
      })
    ]
  }
];
