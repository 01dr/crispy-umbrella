/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 14.03.17
 */

import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => (
    <div>
        <Link to="/">Home</Link>
        <Link to="/invoices">Invoices</Link>
        <Link to="/products">Products</Link>
        <Link to="/customers">Customers</Link>
    </div>
);

export default Menu;