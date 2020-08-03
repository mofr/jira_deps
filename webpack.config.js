module.exports = {
    context: __dirname + '/src/main/resources/javascript',
    entry: './main.js',
    output: {
        path: __dirname + '/target/classes/static',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    }
};
