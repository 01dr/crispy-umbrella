/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 15.03.17
 */

import React, { Component } from 'react';
import {
    Modal, ModalBody, ModalHeader, ModalFooter, ModalTitle,
    Button, FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';

import { closeModalEditProduct, updateProduct } from '../../actions/productsActions';

export default class ModalEditProduct extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            id: '',
            name: '',
            price: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        const { id, name, price } = nextProps.product;
        if (name || price) {
            this.setState({ id, name, price });
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
        const { id, name, price } = this.state;
        e.preventDefault();
        dispatch(updateProduct({ id, name, price }));
        dispatch(closeModalEditProduct());
    }

    render() {
        const { dispatch, open } = this.props;
        const { name, price } = this.state;

        return (
            <Modal show={open}>
                <ModalHeader>
                    <ModalTitle>Edit product</ModalTitle>
                </ModalHeader>

                <ModalBody>
                    <form>
                        <FormGroup>
                            <ControlLabel>Name</ControlLabel>
                            <FormControl
                                type='text'
                                value={name}
                                placeholder='Phone case'
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
                    <Button onClick={::this.handleSubmit} bsStyle='primary'>Update</Button>
                    <Button onClick={ () => dispatch(closeModalEditProduct()) }>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}