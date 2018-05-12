"use strict";
process.env.BABEL_ENV = "main";

const BabiliWebpackPlugin = require("babili-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

const { dependencies } = require("./../package.json");

const config = {
  entry: {
    main: path.join(__dirname, "../src/main.ts")
  },
  externals: [...Object.keys(dependencies || {})],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.node$/,
        use: "node-loader"
      }
    ]
  },
  node: {
    __dirname: process.env.NODE_ENV !== "production",
    __filename: process.env.NODE_ENV !== "production"
  },
  output: {
    filename: "[name].js",
    libraryTarget: "commonjs2",
    path: path.join(__dirname, "../dist/electron")
  },
  plugins: [new webpack.NoEmitOnErrorsPlugin()],
  resolve: {
    extensions: [".js", ".ts", ".json", ".node"]
  },
  target: "electron-main"
};

if (process.env.NODE_ENV === "production") {
  config.plugins.push(
    new BabiliWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": '"production"'
    })
  );
} else {
  // Development configurations
  config.plugins.push(
    new webpack.DefinePlugin({
      __static: `"${path.join(__dirname, "../static").replace(/\\/g, "\\\\")}"`
    })
  );
}

module.exports = config;
