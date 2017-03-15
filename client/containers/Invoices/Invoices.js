/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 14.03.17
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Grid, Row, Col, PageHeader, Button } from 'react-bootstrap';
import Menu from '../../components/Menu/Menu';
import InvoicesTable from '../../components/InvoicesTable/InvoicesTable';
import ModalDeleteInvoice from '../../components/ModalDeleteInvoice/ModalDeleteInvoice';

import { fetchInvoices } from '../../actions/invoicesActions';

class Invoices extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchInvoices());
    }

    render() {
        const {
            dispatch,
            invoicesList,
            modalDeleteInvoiceIsOpen,
            modalDeleteInvoiceCurrent
        } = this.props;

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
                            <InvoicesTable invoicesList={invoicesList} dispatch={dispatch}/>
                        </Col>
                    </Row>
                </Grid>

                <ModalDeleteInvoice
                    open={modalDeleteInvoiceIsOpen}
                    invoice={modalDeleteInvoiceCurrent}
                    dispatch={dispatch}
                />
            </div>
        )
    }
}

export default connect(state => ({
    invoicesList: state.invoicesList,
    modalDeleteInvoiceIsOpen: state.modalDeleteInvoice.open,
    modalDeleteInvoiceCurrent: state.modalDeleteInvoice.invoice,
}))(Invoices);