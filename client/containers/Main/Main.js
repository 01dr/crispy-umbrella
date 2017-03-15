/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 13.03.17
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Menu from '../../components/Menu/Menu';

class Main extends Component {
    render() {
        return (
            <div>
                <Menu/>
                <div>sup!</div>
            </div>
        )
    }
}

export default connect(() => ({}))(Main)