/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 14.03.17
 */

import React, { Component } from 'react';
import Helmet from 'react-helmet';
import EZT from 'react-easy-transition';
import { connect } from 'react-redux';

import { Grid, Row, Col, PageHeader, Button } from 'react-bootstrap';
import Menu from '../../components/Menu/Menu';
import CustomersTable from '../../components/CustomersTable/CustomersTable';
import ModalAddCustomer from '../../components/ModalAddCustomer/ModalAddCustomer';
import ModalDeleteCustomer from '../../components/ModalDeleteCustomer/ModalDeleteCustomer';
import ModalEditCustomer from '../../components/ModalEditCustomer/ModalEditCustomer';

import { fetchCustomers, openModalAddCustomer } from '../../actions/customersActions';

class Customers extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchCustomers());
    }

    render() {
        const {
            dispatch,
            customersList,
            modalAddCustomer,
            modalDeleteCustomerIsOpen,
            modalDeleteCustomerCurrent,
            modalEditCustomerIsOpen,
            modalEditCustomerCurrent
        } = this.props;

        return (
            <div>
                <Helmet title='Customers | Invoice App'/>
                <Menu/>
                <EZT
                    path={location.pathname}
                    initialStyle={{ opacity: 0 }}
                    transition="opacity 0.3s ease-in"
                    finalStyle={{ opacity: 1 }}
                >
                    <Grid>
                        <Row>
                            <Col xs={12}>
                                <PageHeader>
                                    Customer list <Button onClick={ () => dispatch(openModalAddCustomer()) }>Create</Button>
                                </PageHeader>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <CustomersTable
                                    customersList={customersList}
                                    dispatch={dispatch}/>
                            </Col>
                        </Row>
                    </Grid>
                </EZT>

                <ModalAddCustomer
                    open={modalAddCustomer}
                    dispatch={dispatch}/>
                <ModalDeleteCustomer
                    open={modalDeleteCustomerIsOpen}
                    customer={modalDeleteCustomerCurrent}
                    dispatch={dispatch}/>
                <ModalEditCustomer
                    open={modalEditCustomerIsOpen}
                    customer={modalEditCustomerCurrent}
                    dispatch={dispatch}/>
            </div>
        )
    }
}

export default connect(state => ({
    customersList: state.customersList,
    modalAddCustomer: state.modalAddCustomer,
    modalDeleteCustomerIsOpen: state.modalDeleteCustomer.open,
    modalDeleteCustomerCurrent: state.modalDeleteCustomer.customer,
    modalEditCustomerIsOpen: state.modalEditCustomer.open,
    modalEditCustomerCurrent: state.modalEditCustomer.customer
}))(Customers);