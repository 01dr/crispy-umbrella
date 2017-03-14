/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 14.03.17
 */

import React from 'react';
import { Route } from 'react-router-dom';

import Main from './containers/Main/Main';

import Customers from './containers/Customers/Customers';
import Products from './containers/Products/Products';
import Invoices from './containers/Invoices/Invoices';

export default (
    <div>
        <Route exact path='/' component={Main}/>

        <Route path='/customers' component={Customers}/>
        <Route path='/products' component={Products}/>
        <Route path='/invoices' component={Invoices}/>
    </div>
);