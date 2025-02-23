const path = require("path");
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { library } = require("webpack");

module.exports = merge(common, {
    mode: "development",
    devtool: "eval-source-map",
    devServer: {
        watchFiles: ["./src/template.html"],
    },
});