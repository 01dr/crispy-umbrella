/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 15.03.17
 */

import React from 'react';
import { Table } from 'react-bootstrap';

const CustomersTable = props => (
    <Table responsive>
        <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Phone</th>
            </tr>
        </thead>

        <tbody>
            {props.customersList.map(item => (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.address}</td>
                    <td>{item.phone}</td>
                </tr>
            ))}
        </tbody>
    </Table>
);

export default CustomersTable;