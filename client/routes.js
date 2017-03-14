/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 14.03.17
 */

import React from 'react';
import { Route } from 'react-router';

import Main from './containers/Main/Main';
import Alt from './containers/Alt/Alt';

export default (
    <div>
        <Route exact path="/" component={Main}/>
        <Route path="/alt" component={Alt}/>
    </div>
);