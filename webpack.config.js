const path = require("path")
const isProduction = process.env.NODE_ENV === "production"

/** @type {import("webpack").Configuration} */
const config = {
    mode: isProduction ? "production" : "development",
    entry: {
        main: "./src/index.tsx",
    },
    target: 'web',
    output: {
        path: path.resolve(__dirname, "public", "assets"),
        filename: "[name].js",
        publicPath: "/assets/"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: { compilerOptions: { module: "ES2020", moduleResolution: "node" } },
            },
            {
                test: /\.ts?$/,
                loader: "ts-loader",
                options: { compilerOptions: { module: "ES2020", moduleResolution: "node" } },
            },
            {
                test: /\.css$/i,
                use: [
                    'css-loader',
                ],
            }
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
    },
    devtool: "source-map",
    devServer: {
        publicPath: "/assets/",
        contentBase: "public",
        port: 3030
    },
}

module.exports = config