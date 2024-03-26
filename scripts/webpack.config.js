const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const postPresetEnv = require("postcss-preset-env");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const resolvePath = (pa) => {
  return path.resolve(__dirname, pa);
};

module.exports = (isDev) => ({
  mode: isDev ? "development" : "production",
  entry: resolvePath("../src/index.tsx"),
  output: {
    filename: "[name].[hash:8].js",
    path: resolvePath("../dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolvePath("../public/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:8].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /.(js|jsx|ts|tsx)$/,
        include: resolvePath("../src"),
        use: {
          loader: "babel-loader",
        },
        exclude: "/node_modules",
      },
      {
        oneOf: [
          {
            test: /.module.(css|less)$/,
            include: [resolvePath("../src")],
            use: [
              isDev ? "style-loader" : MiniCssExtractPlugin.loader,
              {
                loader: "css-loader",
                options: {
                  importLoaders: 2,
                  modules: {
                    localIdentName: "[path][name]__[local]--[hash:base64:4]",
                  },
                },
              },
              "postcss-loader",
              "less-loader",
            ],
          },
          {
            test: /.(css)$/,
            use: [
              isDev ? "style-loader" : MiniCssExtractPlugin.loader,
              "css-loader",
              "postcss-loader",
            ],
          },
          {
            test: /.less$/,
            use: [
              isDev ? "style-loader" : MiniCssExtractPlugin.loader,
              "css-loader",
              "postcss-loader",
              "less-loader",
            ],
          },
        ],
      },
      //图像
      {
        test: /.(png|jpg|jepg|git|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: { maxSize: 10 * 1024 },
        },
        generator: { filename: "static/images/[name][ext]" },
      },
      //视频
      {
        test: /.(mp4|mp3|webm)$/,
        type: "asset",
        parser: {
          dataUrlCondition: { maxSize: 10 * 1024 },
        },
        generator: { filename: "static/media/[name][ext]" },
      },
      //字体
      {
        test: /.(woff2|eot|ttf|otf)$/,
        type: "asset",
        parser: {
          dataUrlCondition: { maxSize: 10 * 1024 },
        },
        generator: { filename: "static/fonts/[name][ext]" },
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".jsx", ".js", ".tsx", ".ts"],
    alias: {
      "@": resolvePath("../src"),
    },
  },
  devServer: {
    hot: true,
  },
});
