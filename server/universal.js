/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 16.03.17
 */

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { RouterContext, match } from 'react-router';

import configureStore from '../client/store';
// import DevTools from '../client/containers/DevTools';
import routes from '../client/routes';

export default function (req, res) {
    const store = configureStore();

    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
        if (redirectLocation) {
            return res.redirect(301, redirectLocation.pathname + redirectLocation.search);
        }

        if (error) {
            return res.status(500).send(error.message);
        }

        if (!renderProps) {
            return res.status(404).send('Not found');
        }

        const componentHTML = ReactDOMServer.renderToString(
            <Provider store={store}>
                <RouterContext {...renderProps} />
            </Provider>
        );

        return res.end(renderHTML(componentHTML));
    });
}

const assetUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/' : '/';

function renderHTML(componentHTML) {
    return `
    <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>SSR</title>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
          <link rel="stylesheet" href="${assetUrl}styles.css">
      </head>
      <body>
        <div id="root">${componentHTML}</div>
        <script type="application/javascript" src="${assetUrl}vendor.bundle.js"></script>
        <script type="application/javascript" src="${assetUrl}bundle.js"></script>
      </body>
    </html>
  `;
}