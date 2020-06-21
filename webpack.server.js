const path = require('path')
const nodeExternals = require('webpack-node-externals')
// 规避一些node层面的代码

module.exports = {
    target: "node",
    mode: "development",
    entry: "./server/index.js",
    externals: [nodeExternals()],
    output: { // node 需要编译
        filename: "bundle.js",
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ["@babel/preset-react", "@babel/preset-env"]
                }
            },
            {
                test: /\.css$/,
                use: ['isomorphic-style-loader', 'css-loader']
            }
        ]
    }
}
