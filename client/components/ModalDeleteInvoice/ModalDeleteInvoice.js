/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 16.03.17
 */

import React from 'react';
import {
    Modal, ModalBody, ModalHeader, ModalFooter, ModalTitle, Button
} from 'react-bootstrap';

import { closeModalDeleteInvoice, deleteInvoice } from '../../actions/invoicesActions';

const ModalDeleteInvoice = props => {
    const { dispatch, invoice } = props;

    const deleteAndClose = () => {
        dispatch(deleteInvoice(invoice.id));
        dispatch(closeModalDeleteInvoice());
    }

    return (
        <Modal show={props.open}>
            <ModalHeader>
                <ModalTitle>Delete invoice id#{invoice.id}</ModalTitle>
            </ModalHeader>

            <ModalBody>
                R U sure?
            </ModalBody>

            <ModalFooter>
                <Button
                    bsStyle='danger'
                    onClick={() => deleteAndClose()}>Yes</Button>
                <Button onClick={() => dispatch(closeModalDeleteInvoice())}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalDeleteInvoice;