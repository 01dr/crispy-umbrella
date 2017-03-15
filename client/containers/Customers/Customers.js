/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 14.03.17
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Grid, Row, Col, PageHeader, Button } from 'react-bootstrap';
import Menu from '../../components/Menu/Menu';
import CustomersTable from '../../components/CustomersTable/CustomersTable';
import ModalAddCustomer from '../../components/ModalAddCustomer/ModalAddCustomer';

import { fetchCustomers, openModalAddCustomer } from '../../actions/customersActions';

class Customers extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchCustomers());
    }

    render() {
        const { dispatch, customersList, modalAddCustomer } = this.props;

        return (
            <div>
                <Menu/>
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
                            <CustomersTable customersList={customersList}/>
                        </Col>
                    </Row>
                </Grid>

                <ModalAddCustomer open={modalAddCustomer} dispatch={dispatch}/>
            </div>
        )
    }
}

export default connect(state => ({
    customersList: state.customersList,
    modalAddCustomer: state.modalAddCustomer
}))(Customers);