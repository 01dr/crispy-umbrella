/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 15.03.17
 */

import React from 'react';
import { Route, Link } from 'react-router-dom';

const RouterLink = ({ to, children }) => (
    <Route path={to} children={({ match }) => (
        <li role="presentation" className={match ? 'active' : ''}>
            <Link to={to}>{children}</Link>
        </li>
    )} />
);

export default RouterLink;