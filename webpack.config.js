const path = require("path");
const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgeCssPlugin = require("purgecss-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

const PATHS = {
  src: path.join(__dirname, "src"),
};
const CHROME_IN_WINDOWS = "chrome";

module.exports = {
  mode: isProduction ? "production" : "development",

  entry: {
    app: "./src/js/index.js",
  },

  output: {
    path: isProduction
      ? path.resolve(__dirname, "dist")
      : path.resolve(__dirname, "dev"),
    filename: "[name].bundle.js",
    assetModuleFilename: "images/[hash][ext][query]",
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset",
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: "" },
          },
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.handlebars$/i,
        loader: "handlebars-loader",
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin(),
    new PurgeCssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, {
        nodir: true,
      }),
      safelist: {
        greedy: [/^priority-/i],
      },
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],

  devtool: isProduction ? "source-map" : "inline-source-map",

  devServer: {
    contentBase: "./dev",
    hot: true,
    open: {
      app: [CHROME_IN_WINDOWS, "--incognito", "--auto-open-devtools-for-tabs"],
    },
  },
};
