/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 16.03.17
 */

import React from 'react';
import { Table, Button, ButtonGroup } from 'react-bootstrap';

import { openModalDeleteInvoice } from '../../actions/invoicesActions';

const InvoicesTable = props => (
    <Table responsive>
        <thead>
            <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Discount</th>
                <th>Total</th>
                <th/>
            </tr>
        </thead>

        <tbody>
            {props.invoicesList.map(item => (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.customer_id}</td>
                    <td>{item.discount}</td>
                    <td>{item.total}</td>
                    <td>
                        <ButtonGroup>
                            <Button
                                bsStyle="info"
                                bsSize="xsmall"
                            >Edit</Button>
                            <Button
                                bsStyle="danger"
                                bsSize="xsmall"
                                onClick={() => props.dispatch(openModalDeleteInvoice(item))}
                            >Delete</Button>
                        </ButtonGroup>
                    </td>
                </tr>
            ))}
        </tbody>
    </Table>
);

export default InvoicesTable;