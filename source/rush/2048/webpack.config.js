module.exports = {
    entry: "./assets/entry.js",
    output: {
        path: './build/',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, loader: "jsx" },
            { test: /\.sass$/, loader: "style!css!sass"}
        ]
    }
};