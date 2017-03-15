/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 14.03.17
 */

import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import RouterLink from '../common/RouterLink/RouterLink';

const Menu = () => (
    <Navbar>
        <Navbar.Header>
            <Navbar.Brand>
                <Link to="/">Invoice App</Link>
            </Navbar.Brand>
        </Navbar.Header>
        <Nav>
            <RouterLink to="/invoices">Invoices</RouterLink>
            <RouterLink to="/products">Products</RouterLink>
            <RouterLink to="/customers">Customers</RouterLink>
        </Nav>
    </Navbar>
);

export default Menu;