/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 15.03.17
 */

import React, { Component } from 'react';
import {
    Modal, ModalBody, ModalHeader, ModalFooter, ModalTitle,
    Button, FormGroup, ControlLabel, FormControl, Alert
} from 'react-bootstrap';

import { closeModalEditProduct, updateProduct } from '../../actions/productsActions';

export default class ModalEditProduct extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            id: '',
            name: '',
            price: '',
            idError: '',
            nameError: '',
            priceError: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        const { id, name, price } = nextProps.product;
        if (name || price) {
            this.setState({ id, name, price });
        }
    }

    handleFieldChange(field, e) {
        const value = e.target.value;
        this.setState({ [field]: value });
    }

    handleSubmit(e) {
        const { dispatch } = this.props;
        const { id, name, price } = this.state;
        e.preventDefault();

        let errors = false;
        this.setState({ nameError: '', priceError: '', idError: '' });

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

        if (id == null) {
            errors = true;
            this.setState({ idError: 'Something went wrong' });
        }

        if (!errors) {
            dispatch(updateProduct({ id, name, price }));
            dispatch(closeModalEditProduct());
        }
    }

    render() {
        const { dispatch, open } = this.props;
        const { name, price, nameError, priceError, idError } = this.state;

        return (
            <Modal show={open}>
                <form onSubmit={::this.handleSubmit}>
                    <ModalHeader>
                        <ModalTitle>Edit product</ModalTitle>
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <ControlLabel>Name</ControlLabel>
                            <FormControl
                                type='text'
                                name='name'
                                value={name}
                                placeholder='Phone case'
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
                        {idError && <Alert bsStyle='danger'>{idError}</Alert>}
                    </ModalBody>

                    <ModalFooter>
                        <Button type='submit' onClick={::this.handleSubmit} bsStyle='primary'>Update</Button>
                        <Button onClick={ () => dispatch(closeModalEditProduct()) }>Cancel</Button>
                    </ModalFooter>
                </form>
            </Modal>
        )
    }
}