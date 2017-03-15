/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 15.03.17
 */

import React from 'react';
import {
    Modal, ModalBody, ModalHeader, ModalFooter, ModalTitle, Button
} from 'react-bootstrap';

import { closeModalDeleteCustomer, deleteCustomer } from '../../actions/customersActions';

const ModalDeleteCustomer = props => {
    const { dispatch, customer } = props;

    const deleteAndClose = () => {
        dispatch(deleteCustomer(customer.id));
        dispatch(closeModalDeleteCustomer());
    }

    return (
        <Modal show={props.open}>
            <ModalHeader>
                <ModalTitle>Delete customer {customer.name}</ModalTitle>
            </ModalHeader>

            <ModalBody>
                R U sure?
            </ModalBody>

            <ModalFooter>
                <Button
                    bsStyle='danger'
                    onClick={() => deleteAndClose()}>Yes</Button>
                <Button onClick={() => dispatch(closeModalDeleteCustomer())}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalDeleteCustomer;