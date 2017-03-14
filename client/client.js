/* global __DEV__:true */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
// import { syncHistoryWithStore } from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';

import DevTools from './containers/DevTools';
import store from './store';
import routes from './routes';

import './index.html';

const history = createBrowserHistory();

render(
    <Provider store={store}>
        <Router history={ history }>
            <div>
                {routes}
                { __DEV__ ? <DevTools/> : null }
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);