const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/main.ts",
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      {
        /* look for all the files with extension ts and transform them using ts-loader
        * and angular2-template-loader
        */ 
        test: /\.ts$/,
        use: ["ts-loader", "angular2-template-loader"]
      },
      {

        /* look for all the files with extension 
        * html and css to transform them using raw-loader
        */ 
        test: /\.(html|css)$/,
        use: "raw-loader"
      }
    ]
  },
  plugins: [
    // inject JavaScript bundle output outputs to the index.html
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new webpack.DefinePlugin({
      // global app config object
      config: JSON.stringify({
          apiUrl: 'http://localhost:4000'
      })
  })
  ],
  devServer: {
    historyApiFallback: true
  }
};
