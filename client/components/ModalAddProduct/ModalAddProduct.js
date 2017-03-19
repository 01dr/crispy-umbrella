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
            nameError: '',
            priceError: ''
        }
    }

    handleFieldChange(field, e) {
        const value = e.target.value;
        this.setState({ [field]: value });
    }

    handleSubmit(e) {
        const { dispatch } = this.props;
        const { name, price } = this.state;
        e.preventDefault();

        let errors = false;
        this.setState({ nameError: '', priceError: '' });

        if (name.length < 5) {
            errors = true;
            this.setState({ nameError: 'Name should be more than 5 symbols' });
        }

        if (!price.match(/^\d+(.\d{1,2})?$/)) {
            errors = true;
            this.setState({ priceError: 'Price should be a number' });
        }

        if (price === '') {
            errors = true;
            this.setState({ priceError: 'Price is empty' });
        }

        // submit
        if (!errors) {
            dispatch(addProduct({ name, price }));
            dispatch(closeModalAddProduct());
            this.setState({ name: '', price: '' });
        }
    }

    render() {
        const { dispatch, open } = this.props;
        const { name, price, nameError, priceError } = this.state;

        return (
            <Modal show={open}>
                <form onSubmit={::this.handleSubmit}>
                    <ModalHeader>
                        <ModalTitle>Add product</ModalTitle>
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <ControlLabel>Name</ControlLabel>
                            <FormControl
                                type='text'
                                name='name'
                                value={name}
                                placeholder='Phone Holder'
                                onChange={this.handleFieldChange.bind(this, 'name')}
                            />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Price</ControlLabel>
                            <FormControl
                                type='text'
                                name='price'
                                value={price}
                                placeholder='9.99'
                                onChange={this.handleFieldChange.bind(this, 'price')}
                            />
                        </FormGroup>

                        {nameError && <Alert bsStyle='danger'>{nameError}</Alert>}
                        {priceError && <Alert bsStyle='danger'>{priceError}</Alert>}
                    </ModalBody>

                    <ModalFooter>
                        <Button type='submit' onClick={::this.handleSubmit} bsStyle='primary'>Add</Button>
                        <Button onClick={ () => dispatch(closeModalAddProduct()) }>Close</Button>
                    </ModalFooter>
                </form>
            </Modal>
        )
    }
}