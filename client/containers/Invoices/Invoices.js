/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 14.03.17
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Grid, Row, Col, PageHeader, Button } from 'react-bootstrap';
import Menu from '../../components/Menu/Menu';
import InvoicesTable from '../../components/InvoicesTable/InvoicesTable';

import { fetchInvoices } from '../../actions/invoicesActions';

class Invoices extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchInvoices());
    }

    render() {
        const { invoicesList } = this.props;

        return (
            <div>
                <Menu/>
                <Grid>
                    <Row>
                        <Col xs={12}>
                            <PageHeader>
                                Invoices list <Button>Create</Button>
                            </PageHeader>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <InvoicesTable invoicesList={invoicesList}/>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

export default connect(state => ({
    invoicesList: state.invoicesList
}))(Invoices);