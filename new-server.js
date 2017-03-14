/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 14.03.17
 */

const express = require('express');
// const bodyParser = require('body-parser');
// import http from 'http';
const path = require('path');

const app = express();
const port = 3000;
const isDev = process.env.NODE_ENV !== 'production';

if (isDev) {
    const webpack = require('webpack');
    const webpackConfig = require('./webpack.config');

    const compiler = webpack(webpackConfig);

    app.use(require('webpack-dev-middleware')(compiler, {
        publicPath: webpackConfig.output.publicPath,
        hot: true,
        noInfo: true,
        stats: 'minimal',
    }));

    app.use(require('webpack-hot-middleware')(compiler));
}

app.use(express.static(path.join(__dirname, '/static')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/index.html'));
});

app.listen(port);