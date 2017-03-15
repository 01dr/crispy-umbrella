/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 15.03.17
 */

import React from 'react';
import {
    Modal, ModalBody, ModalHeader, ModalFooter, ModalTitle, Button
} from 'react-bootstrap';

import { closeModalDeleteProduct, deleteProduct } from '../../actions/productsActions';

const ModalDeleteProduct = props => {
    const { dispatch, product } = props;

    const deleteAndClose = () => {
        dispatch(deleteProduct(product.id));
        dispatch(closeModalDeleteProduct());
    }

    return (
        <Modal show={props.open}>
            <ModalHeader>
                <ModalTitle>Delete product {product.name}</ModalTitle>
            </ModalHeader>

            <ModalBody>
                R U sure?
            </ModalBody>

            <ModalFooter>
                <Button
                    bsStyle='danger'
                    onClick={() => deleteAndClose()}>Yes</Button>
                <Button onClick={() => dispatch(closeModalDeleteProduct())}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalDeleteProduct;