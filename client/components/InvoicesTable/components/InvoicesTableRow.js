/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 16.03.17
 */

import React, { Component } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
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
        superagent
            .get(`/api/v1/customers/${this.props.item.customer_id}`)
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
                <td className='col-xs-1'>{id}</td>
                <td className='col-xs-3'>{customer ? customer.name : 'DELETED CUSTOMER'}</td>
                <td className='col-xs-2'>{discount}</td>
                <td className='col-xs-2'>{Number(total).toFixed(2)}</td>
                <td className='col-xs-4 text-right'>
                    <ButtonGroup>
                        <LinkContainer to={`/invoices/${id}/edit`}>
                            <Button bsSize='xsmall'>Edit</Button>
                        </LinkContainer>
                        <Button
                            bsStyle='danger'
                            bsSize='xsmall'
                            onClick={() => dispatch(openModalDeleteInvoice(item))}
                        >Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        )
    }
}