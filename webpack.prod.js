const path = require('path');
const Config = require('webpack-config').Config;
const SentryPlugin = require('@sentry/webpack-plugin');

module.exports = new Config().extend('webpack.base.js').merge({
    mode: 'production',
    devtool: "source-map",

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "portfolio.js"
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    configFile: 'tsconfig.production.json'
                }
            }
        ]
    },

    plugins: [
        new SentryPlugin({
            release: process.env.PORTFOLIO_VERSION,
            include: './build'
        })
    ]
});