/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 13.03.17
 */

import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import DevTools from '../DevTools';

import Main from '../Main/Main';

export default class Root extends Component {
    render() {
        const { store } = this.props;
        return (
            <Provider store={store}>
                <div>
                    <Main/>
                    <DevTools/>
                </div>
            </Provider>
        );
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired
};