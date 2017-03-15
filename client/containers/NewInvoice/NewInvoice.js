/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 16.03.17
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Grid, Row, Col, PageHeader } from 'react-bootstrap';
import Menu from '../../components/Menu/Menu';

class NewInvoice extends Component {
    render() {
        return (
            <div>
                <Menu/>
                <Grid>
                    <Row>
                        <Col xs={12}>
                            <PageHeader>
                                Add invoice
                            </PageHeader>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            add invoice
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

export default connect(() => ({}))(NewInvoice);