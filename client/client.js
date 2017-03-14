import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
// import { syncHistoryWithStore } from 'react-router-redux'
import createBrowserHistory from 'history/createBrowserHistory'

import DevTools from './containers/DevTools';
// import Root from './containers/Root';
import store from './store';
import routes from './routes';

import './index.html';

const history = createBrowserHistory();

render(
    <Provider store={store}>
        <Router history={ history }>
            <div>
                {routes}
                <DevTools/>
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);

// if (module.hot) {
//     module.hot.accept('./containers/Root/index', () => {
//         const NewRoot = require('./containers/Root/index').default;
//         render(
//             <NewRoot store={store}/>,
//             document.getElementById('root')
//         );
//     });
// }