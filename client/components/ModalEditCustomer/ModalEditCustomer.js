/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 15.03.17
 */

import React, { Component } from 'react';
import {
    Modal, ModalBody, ModalHeader, ModalFooter, ModalTitle,
    Button, FormGroup, ControlLabel, FormControl, Alert
} from 'react-bootstrap';

import { closeModalEditCustomer, updateCustomer } from '../../actions/customersActions';

export default class ModalEditCustomer extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            id: '',
            name: '',
            address: '',
            phone: '',
            idError: '',
            nameError: '',
            addressError: '',
            phoneError: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        const { id, name, address, phone } = nextProps.customer;
        if (name || address || phone) {
            this.setState({ id, name, address, phone });
        }
    }

    handleFieldChange(field, e) {
        const value = e.target.value;
        this.setState({ [field]: value });
    }

    handleSubmit(e) {
        const { dispatch } = this.props;
        const { id, name, address, phone } = this.state;
        e.preventDefault();

        let errors = false;
        this.setState({ nameError: '', addressError: '', phoneError: '', idError: '' });

        if (name.length < 5) {
            errors = true;
            this.setState({ nameError: 'Name should be more than 5 symbols' });
        }

        if (address === '') {
            errors = true;
            this.setState({ addressError: 'Address is empty' });
        }

        if (phone === '') {
            errors = true;
            this.setState({ phoneError: 'Phone is empty' });
        }

        if (id == null) {
            errors = true;
            this.setState({ idError: 'Something went wrong' });
        }

        if (!errors) {
            dispatch(updateCustomer({ id, name, address, phone }));
            dispatch(closeModalEditCustomer());
        }
    }

    render() {
        const { dispatch, open } = this.props;
        const { name, address, phone, nameError, addressError, phoneError, idError } = this.state;

        return (
            <Modal show={open}>
                <form onSubmit={::this.handleSubmit}>
                    <ModalHeader>
                        <ModalTitle>Edit customer</ModalTitle>
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <ControlLabel>Name</ControlLabel>
                            <FormControl
                                type='text'
                                name='name'
                                value={name}
                                placeholder='John Doe'
                                onChange={this.handleFieldChange.bind(this, 'name')}
                            />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Address</ControlLabel>
                            <FormControl
                                type='text'
                                name='address'
                                value={address}
                                placeholder='788, 21 st, New York, NY, USA'
                                onChange={this.handleFieldChange.bind(this, 'address')}
                            />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Phone</ControlLabel>
                            <FormControl
                                type='text'
                                name='phone'
                                value={phone}
                                placeholder='+19834729834'
                                onChange={this.handleFieldChange.bind(this, 'phone')}
                            />
                        </FormGroup>

                        {nameError && <Alert bsStyle='danger'>{nameError}</Alert>}
                        {addressError && <Alert bsStyle='danger'>{addressError}</Alert>}
                        {phoneError && <Alert bsStyle='danger'>{phoneError}</Alert>}
                        {idError && <Alert bsStyle='danger'>{idError}</Alert>}
                    </ModalBody>

                    <ModalFooter>
                        <Button type='submit' onClick={::this.handleSubmit} bsStyle='primary'>Update</Button>
                        <Button onClick={ () => dispatch(closeModalEditCustomer()) }>Cancel</Button>
                    </ModalFooter>
                </form>
            </Modal>
        )
    }
}