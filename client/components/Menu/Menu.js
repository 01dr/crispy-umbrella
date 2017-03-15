/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 14.03.17
 */

import React from 'react';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

import { Navbar, Nav, NavItem } from 'react-bootstrap';

const Menu = () => (
    <Navbar>
        <Navbar.Header>
            <Navbar.Brand>
                <Link to="/">Invoice App</Link>
            </Navbar.Brand>
        </Navbar.Header>
        <Nav>
            <LinkContainer to="/invoices"><NavItem>Invoices</NavItem></LinkContainer>
            <LinkContainer to="/products"><NavItem>Products</NavItem></LinkContainer>
            <LinkContainer to="/customers"><NavItem>Customers</NavItem></LinkContainer>
            <LinkContainer to="/invoices/add"><NavItem>add invoice</NavItem></LinkContainer>
        </Nav>
    </Navbar>
);

export default Menu;