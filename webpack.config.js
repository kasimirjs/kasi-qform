const path = require('path');

module.exports = {
    entry: {
        'showcase/dist/index': './showcase/index.ts'
    },
    cache: true,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'esbuild-loader',
                        options: {
                            loader: "ts",
                        }
                    }
                ],

                include: [
                    path.resolve(__dirname, "src"),
                    path.resolve(__dirname, "workspaces"),
                    path.resolve(__dirname, "showcase"),
                    path.resolve(__dirname, "examples"),
                ]
            },
            {
                enforce: 'pre',
                test: /\.html$/,
                loader: 'raw-loader',
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    "css-loader", 'sass-loader'],
                include: path.resolve(__dirname, "")
            },


        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', ".scss", ".css"],
    },
    devtool: 'source-map',
    mode: "development",
    //mode: "production",
    devServer: {
        static: {
            directory: path.join(__dirname, './'),
        },
        compress: true,
        port: 4000,
    },
    plugins: [

    ],

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './'),
    },
};
