const merge = require('webpack-merge');
const commonConfig = require('./webpack');

module.exports = merge(commonConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map'
});
