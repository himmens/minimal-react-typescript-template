const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const path = require('path');
const express = require('express');
const webpackConfig = require('../../scripts/webpack/webpack.dev');

const app = express();
const compiler = webpack(webpackConfig);

app.get('/data', (req, res) => {
    res.json({ value: 'Hello from server!' });
});

app.use(middleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    historyApiFallback: false,
    noInfo: true,
    hot: true,
    silent: true,
    stats: 'errors-only',
    headers: {}
}));

// Hack for WebpackHtmlPlugin
// @see https://github.com/jantimon/html-webpack-plugin/issues/145
app.get('*', (req, res, next) => {
    const filename = path.join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, (err, result) => {
        if (err) {
            return next(err);
        }

        res.set('Content-Type', 'text/html');
        res.send(result);
        res.end();
    });
});

app.use((error, req, res, next) => {
    console.error(error);

    res.status(401);
    res.json({ error: { message: error.message } });
});

app.listen(8080, () => {
    console.log('Listening at http://localhost:8080');
});
