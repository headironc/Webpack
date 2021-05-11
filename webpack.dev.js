const path = require("path");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  //webpack.dev.js 开发配置文件
  mode: "development",
  entry: "./src/index.js", //入口文件
  output: {
    filename: "[name].js", //开发环境不一定使用hash，加快构建速度
    path: path.resolve(__dirname, "dist"), //输出目录
  },
  optimization: {
    splitChunks: {
      chunks: "all", //将各个组件公共的依赖提取到某个chunk，防止重复打包
    },
  },
  devtool: "eval-source-map", //代码调试
  devServer: {
    contentBase: "./dist", //web server,托管目录/dist
    compress: true, //压缩
    port: 3001,
    hot: true, //热更新
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: require.resolve("babel-loader"),
            options: {
              presets: ["@babel/env", "@babel/preset-react"],
              plugins: [require.resolve("react-refresh/babel")].filter(Boolean), //React fast refresh
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), //每次生成/dist文件夹内容之前清理文件夹内的文件
    new HtmlWebpackPlugin({
      title: "Blueberry",
      // template: "public/index.html",
    }), //生成index.html文件
    new WebpackManifestPlugin(), //生成manifest.json
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
};
