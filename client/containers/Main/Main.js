/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 13.03.17
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Grid, Row, Col, Jumbotron } from 'react-bootstrap';
import Menu from '../../components/Menu/Menu';

import '../assets/bootstrap/css/bootstrap.min.css';

class Main extends Component {
    render() {
        return (
            <div>
                <Menu/>
                <Grid>
                    <Row>
                        <Col xs={12}>
                            <Jumbotron>
                                <h1>Ну привет</h1>
                                <p>Надо же заполнить как-то эту страницу, ведь так? Она как раз статичная и никто не заметит, как в фоне грузится жирненький бандл :)</p>
                            </Jumbotron>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

export default connect(() => ({}))(Main)