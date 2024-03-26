const getBaseCfg = require("./webpack.config");
const { merge } = require("webpack-merge");
const path = require("path");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(getBaseCfg(false), {
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({ parallel: true }),
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            pure_funcs: ["console.log", "console.warn"],
          },
        },
      }),
    ],
    splitChunks: {
      chunks: "async",
      minSize: 20000,
      minChunks: 1,
      cacheGroups: {
        vendors: {
          priority: 1,
          test: /node_modules/,
          name: "vendors",
        },
        commons: {
          name: "commons",
          minChunks: 3,
        },
      },
    },
  },
});
