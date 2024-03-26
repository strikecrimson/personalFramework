const getBaseCfg = require("./webpack.config");
const { merge } = require("webpack-merge");
const path = require("path");

module.exports = merge(getBaseCfg(true), {
  devtool: "source-map",
  devServer: {
    port: 3614,
    compress: true,
    hot: true,
    historyApiFallback: true,
    static: { directory: path.join(__dirname, "../public") },
  },
});
