/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 16.03.17
 */

import React from 'react';
import { Table } from 'react-bootstrap';
import InvoicesTableRow from './components/InvoicesTableRow';

const InvoicesTable = props => (
    <Table responsive hover>
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
                <InvoicesTableRow
                    key={item.id}
                    item={item}
                    dispatch={props.dispatch}
                />
            ))}
        </tbody>
    </Table>
);

export default InvoicesTable;