/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 14.03.17
 */

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';

import configureStore from '../client/store';
import DevTools from '../client/containers/DevTools';
import routes from '../client/routes';

const isDev = (process.env.NODE_ENV !== 'production');

export default function (req, res) {
    console.log(' [x] Request for', req.url);
    const initialState = {};

    const store = configureStore(req, initialState);

    // Wire up routing based upon routes
    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
        if (error) {
            console.log('Error', error);
            res.status(400);
            res.send(error);
            return;
        }

        if (redirectLocation) {
            res.redirect(redirectLocation);
            return;
        }

        const devTools = (isDev) ? <DevTools /> : null;

        // Render the component to a string
        const html = ReactDOMServer.renderToString(
            <Provider store={store}>
                <div>
                    <StaticRouter {...renderProps} />
                    {devTools}
                </div>
            </Provider>
        );

        res.render('index', { isProd: (!isDev), html, initialState: store.getState() });
    });
}