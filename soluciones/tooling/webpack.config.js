var path = require("path")
module.exports = {
  entry: {
    app: ["./src/index.js"]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
  resolve: {
    alias: {
      resources: path.resolve(__dirname, 'src/resources')
    }
  },
  module: {
    rules: [
      { enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
      { test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        },
        include: [path.join(__dirname, 'src')]
      }
    ]
  }
}
