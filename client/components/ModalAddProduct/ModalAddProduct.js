/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 15.03.17
 */

import React, { Component } from 'react';
import {
    Modal, ModalBody, ModalHeader, ModalFooter, ModalTitle,
    Button, FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';

import { closeModalAddProduct, addProduct } from '../../actions/productsActions';

export default class ModalAddProduct extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            name: this.props.name || '',
            price: this.props.price || ''
        }
    }

    handleNameChange(e) {
        this.setState({ name: e.target.value });
    }

    handlePriceChange(e) {
        this.setState({ price: e.target.value });
    }

    handleSubmit(e) {
        const { dispatch } = this.props;
        const { name, price } = this.state;
        e.preventDefault();
        dispatch(addProduct({ name, price }));
        dispatch(closeModalAddProduct());
    }

    render() {
        const { dispatch, open } = this.props;
        const { name, price } = this.state;

        return (
            <Modal show={open}>
                <ModalHeader>
                    <ModalTitle>Add product</ModalTitle>
                </ModalHeader>

                <ModalBody>
                    <form>
                        <FormGroup>
                            <ControlLabel>Name</ControlLabel>
                            <FormControl
                                type='text'
                                value={name}
                                placeholder='Phone Holder'
                                onChange={::this.handleNameChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Price</ControlLabel>
                            <FormControl
                                type='text'
                                value={price}
                                placeholder='9.99'
                                onChange={::this.handlePriceChange}
                            />
                        </FormGroup>
                    </form>
                </ModalBody>

                <ModalFooter>
                    <Button onClick={::this.handleSubmit} bsStyle='primary'>Add</Button>
                    <Button onClick={ () => dispatch(closeModalAddProduct()) }>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }
}