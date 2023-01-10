const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/'
};

const PAGES_PUG_DIR = path.resolve(__dirname, 'src/pug');
const PAGES_PUG = fs.readdirSync(PAGES_PUG_DIR).filter(fileName => fileName.endsWith('.pug'));

const PAGES_HTML_DIR = path.resolve(__dirname, 'src/html');
const PAGES_HTML = fs.readdirSync(PAGES_HTML_DIR).filter(fileName => fileName.endsWith('.html'));
const SCSS_DIR = path.resolve(__dirname, 'src/scss');

const devServer = (isDev) => !isDev ? {} : {
  devServer: {
    open: false,
    hot: false,
    port: 8080,
    liveReload: true,
    watchFiles: [ path.resolve(__dirname, 'src/**/*') ],
    allowedHosts: 'auto',
    https: false,
  }
};

module.exports = ({develop}) => ({
  mode: develop ? 'development' : 'production',
  entry: './src/index.js',
  // target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
    clean: true,
  },
  plugins: [
    ...PAGES_PUG.map(page => new HtmlWebpackPlugin({
      template: `${PAGES_PUG_DIR}/${page}`,
      filename: `./pug/${page.replace(/\.pug/,'.html')}`
    })),
    ...PAGES_HTML.map(page => new HtmlWebpackPlugin({
      template: `${PAGES_HTML_DIR}/${page}`,
      filename: `./${page}`
    })),

    // new HtmlWebpackPlugin({
    //     template: './src/index.html'
    // }),
    new MiniCssExtractPlugin({
        filename: './styles/main.css',
    })
  ],
  module: {
      rules: [
          // {
          //   test: /\.(?:ico|png|jpg|jpeg|svg)$/i,
          //   type: 'asset/inline',
          //   // type: 'asset/resource',
          // },
          {
            test: /\.(?:ico|png|jpg|jpeg|svg)$/,
            loader: 'url-loader'
          },
          {
            test: /\.html$/i,
            loader: 'html-loader',
            options: {
              // Disables attributes processing
              sources: false,
            },
          },
          {
            test: /\.css$/i,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: "css-loader",
                options: {
                  sourceMap: true,
                },
              },
            ]
          },
          {
            test: /\.scss$/i,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: "css-loader",
                options: {
                  sourceMap: true,
                },
              },
              {
                loader: "sass-loader",
                options: {
                  sourceMap: true,
                },
              },
            ],
          },
          {
            test: /\.pug$/,
            loader: 'pug-loader',
          }
      ]
  },
  ...devServer(develop),
});