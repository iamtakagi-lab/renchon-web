import * as path from 'path';
import * as webpack from 'webpack';
const isProduction = process.env.NODE_ENV === "production"

const config: webpack.Configuration = {
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
        rules: [{
                test: [/\.tsx?$/, /\.ts$/],
                loader: "ts-loader",
                options: { compilerOptions: { module: "ES2020", moduleResolution: "node" } },
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
    },
}

module.exports = config