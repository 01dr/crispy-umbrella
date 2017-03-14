/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 13.03.17
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import sa from 'superagent';
//import '../common/global.pcss';

class Main extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            customers: []
        }
    }

    componentDidMount() {
        sa
            .get('/api/customers')
            .set('Accept', 'application/json')
            .end((error, result) =>
                (error
                    ? console.log(error)
                    : console.log(result.body)));

        console.log(this.state.customers);
    }

    render() {
        return (
            <div>
                <Link to="/">Home</Link>
                <Link to="/alt">Alt</Link>
                sup
            </div>
        )
    }
}

export default connect(() => ({}))(Main)