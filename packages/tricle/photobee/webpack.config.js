require('babel-polyfill'); // nodejs 0.10 fallback

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackNotifierPlugin = require('webpack-notifier');
var autoprefixer = require('autoprefixer');

var assetsDir = path.join(__dirname, 'assets');

module.exports = [
    {
        devtool: 'source-map',

        entry: {
            theme: [
                path.join(assetsDir, 'sass/theme.scss'),
            ],
        },

        output: {
            path: path.join(__dirname, 'css/'),
            publicPath: '',
            filename: '[name].css'
        },

        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery",
                'window.Tether': 'tether',
                tether: 'tether',
                Tether: 'tether'
            }),
            new ExtractTextPlugin('[name].css'),
            new WebpackNotifierPlugin(),
            new webpack.NoErrorsPlugin()
        ],
        module: {
            loaders: [
                {test: /\.woff2?(\?v=[\d\.]+)?$/, loader: 'url-loader?limit=1024&minetype=application/font-woff'},
                {test: /\.(ttf|eot|svg)(\?v=[\d\.]+)?$/, loader: 'file-loader'},
                {test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=1024'},
                {test: /\.css$/,  loader: ExtractTextPlugin.extract('style', 'css?sourceMap')},
                {test: /\.less$/, loader: ExtractTextPlugin.extract('css?sourceMap!' + 'less?sourceMap')},
                {test: /\.scss$/, loader: ExtractTextPlugin.extract('css?sourceMap!postcss!' + 'sass?sourceMap')},
                {test: /\.jsx?$/, loader: 'babel', include: /app|node_modules\/bootstrap/}
            ]
        },
        postcss: [ autoprefixer({ browsers: ['> 2%','last 3 version', 'ie 10','ios 7.1','android 4.4'] }) ]
    },
    {
        devtool: 'source-map',

        entry: {
            theme: [
                path.join(assetsDir, 'js/theme.js')
            ],
        },

        output: {
            path: path.join(__dirname, 'js/'),
            publicPath: '',
            filename: '[name].js'
        },

        resolve: {
            root: [
                path.join(__dirname, 'web/bundles')
            ],
            alias: {
                //"jquery" : "jquery-3/dist/jquery.slim.js"
            }
        },

        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery",
                'window.Tether': 'tether',
                tether: 'tether',
                Tether: 'tether'
            }),
            new ExtractTextPlugin('[name].css'),
            new WebpackNotifierPlugin(),
            new webpack.NoErrorsPlugin()
        ],
        module: {
            loaders: [
                {test: /\.jsx?$/, loader: 'babel', include: /app|node_modules\/bootstrap/}
            ]
        },
    }
];
