/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 13.03.17
 */

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import objectAssign from 'object-assign';

import reducers from '../reducers';

const initialState = {};

const rootReducer = combineReducers(objectAssign({}, reducers));

const enhancer = compose(
    applyMiddleware(thunk),
);

const store = createStore(rootReducer, initialState, enhancer);

export default store;