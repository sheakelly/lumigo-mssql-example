const path = require("path")
const slsw = require("serverless-webpack")

module.exports = {
  mode: "production",
  entry: slsw.lib.entries,
  resolve: {
    extensions: [".js", ".json", ".ts", ".tsx"]
  },
  externals: [{ "aws-sdk": "commonjs aws-sdk", mssql: "commonjs mssql" }],
  output: {
    libraryTarget: "commonjs",
    path: path.join(__dirname, ".webpack"),
    filename: "[name].js"
  },
  target: "node",
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true
            }
          }
        ]
      }
    ]
  }
}
