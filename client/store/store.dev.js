/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 13.03.17
 */

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import objectAssign from 'object-assign';

import DevTools from '../containers/DevTools';
import reducers from '../reducers';

const initialState = {};

const rootReducer = combineReducers(objectAssign({}, reducers));

const loggerMiddleware = createLogger({
    level: 'info',
    collapsed: true
});

const enhancer = compose(
    applyMiddleware(thunk, loggerMiddleware),
    DevTools.instrument()
);

const store = createStore(rootReducer, initialState, enhancer);

export default store;