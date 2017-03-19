/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 15.03.17
 */

import React, { Component } from 'react';
import {
    Modal, ModalBody, ModalHeader, ModalFooter, ModalTitle,
    Button, FormGroup, ControlLabel, FormControl, Alert
} from 'react-bootstrap';

import { closeModalAddProduct, addProduct } from '../../actions/productsActions';

export default class ModalAddProduct extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            name: this.props.name || '',
            price: this.props.price || '',
            nameErrorText: '',
            priceErrorText: '',
            formValidate: false
        }
    }

    handleNameChange(e) {
        const name = e.target.value;
        this.setState({ name }, () => this.handleNameValidate(name));
    }

    handlePriceChange(e) {
        const price = e.target.value;
        this.setState({ price }, () => this.handlePriceValidate(price));
    }

    handleNameValidate(value) {
        if (value.length < 5) {
            this.setState({ nameError: 'Name should be more than 5 symbols' });
        } else {
            this.setState({ nameError: '' });
        }
    }

    handlePriceValidate(value) {
        if (!value.match(/^\d+(.\d{1,2})?$/)) {
            this.setState({ priceError: 'Price should be a number' });
        } else if (value === '') {
            this.setState({ priceError: 'Price is empty' });
        } else {
            this.setState({ priceError: '' });
        }
    }

    handleSubmit(e) {
        const { dispatch } = this.props;
        const { name, price, nameError, priceError } = this.state;
        e.preventDefault();

        if (nameError + priceError === '') {
            dispatch(addProduct({ name, price }));
            dispatch(closeModalAddProduct());
        }
    }

    render() {
        const { dispatch, open } = this.props;
        const { name, price, nameError, priceError } = this.state;

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
                                name='name'
                                value={name}
                                placeholder='Phone Holder'
                                onChange={::this.handleNameChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Price</ControlLabel>
                            <FormControl
                                type='text'
                                name='price'
                                value={price}
                                placeholder='9.99'
                                onChange={::this.handlePriceChange}
                            />
                        </FormGroup>
                    </form>

                    {nameError && <Alert bsStyle='danger'>{nameError}</Alert>}
                    {priceError && <Alert bsStyle='danger'>{priceError}</Alert>}
                </ModalBody>

                <ModalFooter>
                    <Button onClick={::this.handleSubmit} bsStyle='primary'>Add</Button>
                    <Button onClick={ () => dispatch(closeModalAddProduct()) }>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }
}