/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 14.03.17
 */

import React, { Component, PropTypes } from 'react';

export default class Html extends Component {
    render() {
        const { assets, store, content } = this.props;
        const preloadedState = store.getState();

        return (
            <html>
                <head>
                    <title>Hey</title>
                </head>
                <body>
                    <div id="content" dangerouslySetInnerHTML={{ __html: content }}/>
                    <script
                        dangerouslySetInnerHTML={{ __html: `window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}` }}
                    />
                    <script src={ assets.vendor.js } />
                    <script src={ assets.main.js } />
                </body>
            </html>
        );
    }

}

Html.propTypes = {
    content: PropTypes.string,
    store: PropTypes.object,
    assets: PropTypes.object
};