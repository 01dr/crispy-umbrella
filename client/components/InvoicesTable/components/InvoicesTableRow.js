/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 16.03.17
 */

import React, { Component } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import superagent from 'superagent';

import { openModalDeleteInvoice } from '../../../actions/invoicesActions';

export default class InvoicesTableRow extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            customer: ''
        }
    }

    componentDidMount() {
        const { customer_id } = this.props.item;
        superagent
            .get(`/api/v1/customers/${customer_id}`)
            .set('Accept', 'application/json')
            .end((error, result) =>
                (error
                    ? console.log(error)
                    : this.setState({ customer: JSON.parse(result.text) })));
    }

    render() {
        const { dispatch, item } = this.props;
        const { id, discount, total } = item;
        const { customer } = this.state;

        return (
            <tr>
                <td>{id}</td>
                <td>{customer.name}</td>
                <td>{discount}</td>
                <td>{total}</td>
                <td>
                    <ButtonGroup>
                        <Button
                            bsStyle="info"
                            bsSize="xsmall"
                        >Edit</Button>
                        <Button
                            bsStyle="danger"
                            bsSize="xsmall"
                            onClick={() => dispatch(openModalDeleteInvoice(item))}
                        >Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        )
    }
}