/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 14.03.17
 */

import React from 'react';
import { Route } from 'react-router';

import Main from './containers/Main/Main';

import Customers from './containers/Customers/Customers';
import Products from './containers/Products/Products';
import Invoices from './containers/Invoices/Invoices';
import NewInvoice from './containers/NewInvoice/NewInvoice';
import EditInvoice from './containers/EditInvoice/EditInvoice';

export default (
    <div>
        <Route exact path='/' component={Main}/>

        <Route path='/customers' component={Customers}/>
        <Route path='/products' component={Products}/>
        <Route exact path='/invoices' component={Invoices}/>
        <Route path='/invoices/add' component={NewInvoice}/>
        <Route path='/invoices/:id/edit' component={EditInvoice}/>
    </div>
);