"use strict";

process.env.NODE_ENV = "production";

const { say } = require("cfonts");
const { spawn } = require("child_process");
const chalk = require("chalk");
const del = require("del");
const webpack = require("webpack");
const Multispinner = require("multispinner");

const mainConfig = require("./webpack.main.config");
const rendererConfig = require("./webpack.renderer.config");
const webConfig = require("./webpack.web.config");

const doneLog = chalk.bgGreen.white(" DONE ") + " ";
const errorLog = chalk.bgRed.white(" ERROR ") + " ";
const okayLog = chalk.bgBlue.white(" OKAY ") + " ";

if (process.env.BUILD_TARGET === "web") web();
else build();

function build() {
  return new Promise(function (accept, reject) {
    const tasks = ["main", "renderer"];
    const m = new Multispinner(tasks, {
      preText: "building",
      postText: "process"
    });

    m.once("success", () => accept());

    del.sync(["dist/electron/*", "!.gitkeep"])

    pack(mainConfig)
      .then((result) => m.success("main"))
      .catch((err) => {
        m.error("main");
        return reject(err);
      });

    pack(rendererConfig)
      .then((result) => m.success("renderer"))
      .catch((err) => {
        m.error("renderer");
        return reject(err);
      });
    });
}

function pack(config) {
  return new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      if (err) reject(err.stack || err);
      else if (stats.hasErrors()) {
        let err = "";

        stats
          .toString({
            chunks: false,
            colors: true
          })
          .split(/\r?\n/)
          .forEach(line => {
            err += `    ${line}\n`;
          });

        reject(err);
      } else {
        resolve(
          stats.toString({
            chunks: false,
            colors: true
          })
        );
      }
    });
  });
}

function web() {
  return new Promise(function (accept, reject) {
    del.sync(["dist/web/*", "!.gitkeep"]);
    webpack(webConfig, (err, stats) => {
      if (err || stats.hasErrors()) return reject(err);
      return accept();
    });
  });
}
