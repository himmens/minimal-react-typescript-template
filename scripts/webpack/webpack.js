const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * Directories constants
 * @type {string}
 */
const ROOT_DIR = path.join(__dirname, '../..');
const APP_DIR = path.join(__dirname, '../..', 'src/app');

const source = [
    path.join(ROOT_DIR, 'src')
];

/**
 * Base config for webpack
 * @type {Object}
 */
module.exports = {
    entry: {
        app: [
            './index'
        ]
    },
    output: {
        path: path.join(ROOT_DIR, 'dist'),
        publicPath: '/',
        chunkFilename: '[name].js?[hash:8]',
        filename: '[name].js?[hash:8]'
    },
    context: APP_DIR,
    target: 'web',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        modules: [
            path.join(ROOT_DIR, 'node_modules')
        ],
        alias: {
            app: path.resolve(APP_DIR)
        }
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                loader: 'babel-loader',
                include: source,
                options: {
                    babelrc: false,
                    cacheDirectory: false,
                    presets: [
                        require.resolve('@babel/preset-typescript'),
                        require.resolve('@babel/preset-react'),
                        [require.resolve('@babel/preset-env'), { targets: { browsers: ['last 2 versions', 'ie >= 11', 'safari >= 9'] }, modules: false }]
                    ],
                    plugins: [
                        '@babel/plugin-syntax-dynamic-import',
                        '@babel/plugin-syntax-class-properties',
                        '@babel/plugin-proposal-class-properties',
                        '@babel/plugin-syntax-export-extensions'
                    ]
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: source,
                options: {
                    babelrc: false,
                    cacheDirectory: false,
                    presets: [
                        require.resolve('@babel/preset-react'),
                        [require.resolve('@babel/preset-env'), { targets: { browsers: ['last 2 versions', 'ie >= 11', 'safari >= 9'] }, modules: false }]
                    ],
                    plugins: [
                        '@babel/plugin-syntax-dynamic-import',
                        '@babel/plugin-syntax-class-properties',
                        '@babel/plugin-proposal-class-properties',
                        '@babel/plugin-syntax-export-extensions'
                    ]
                }
            },
            {
                test: /\.css/,
                include: source,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]-[local]-[hash:base64:4]',
                                context: ROOT_DIR
                            },
                            importLoaders: 2
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|woff|woff2)$/,
                include: source,
                loader: 'url-loader',
                options: {
                    limit: 100000
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            inject: true
        }),
        new MiniCssExtractPlugin({
            filename: 'app.css?[hash:8]'
        })
    ]
};
