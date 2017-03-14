/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 13.03.17
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Alt extends Component {
    render() {
        return (
            <div>
                <Link to="/">Home</Link>
                <Link to="/alt">Alt</Link>
                alt
            </div>
        )
    }
}