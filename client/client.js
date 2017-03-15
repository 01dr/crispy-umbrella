/* global __DEV__:true */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createHistory } from 'history';

import DevTools from './containers/DevTools';
import store from './store';
import routes from './routes';

import './index.html';

const history = createHistory();

render(
    <Provider store={store}>
        <Router history={history}>
            <div>
                {routes}
                { __DEV__ ? <DevTools/> : null }
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);