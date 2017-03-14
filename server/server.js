/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 14.03.17
 */

import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import http from 'http';
import webpack from 'webpack';

import webpackConfig from '../webpack.config';

const app = express();
const httpServer = http.createServer(app);
const port = 3000;

app.use(webpackDevMiddleware(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true },
}));

app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use(bodyParser.json());

app.get('*', (req, res) => {

    const store = createStore(reducers);
    const context = {};

    const content = renderToString(
        <StaticRouter location={req.url} context={context}>
            <Provider store={store} key="provider">
                <Layout />
            </Provider>
        </StaticRouter>
    );

    // in order for the bundled react to reconcile with the server rendered tree,
    // we must renderToString the two different sections, so that the render from
    // client/index has a matching tree
    const html = renderToString(
        <Html
            store={ store }
            assets={ assets }
            content= { content }
        />
    );

    res.send(html);
});

httpServer.listen(port);