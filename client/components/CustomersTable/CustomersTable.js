/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 15.03.17
 */

import React from 'react';
import { Table, Button, ButtonGroup } from 'react-bootstrap';

import { openModalDeleteCustomer, openModalEditCustomer } from '../../actions/customersActions';

const CustomersTable = props => (
    <Table responsive hover>
        <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th/>
            </tr>
        </thead>

        <tbody>
            {props.customersList.map(item => (
                <tr key={item.id}>
                    <td className='col-xs-1'>{item.id}</td>
                    <td className='col-xs-3'>{item.name}</td>
                    <td className='col-xs-4'>{item.address}</td>
                    <td className='col-xs-2'>{item.phone}</td>
                    <td className='col-xs-2 text-right'>
                        <ButtonGroup>
                            <Button
                                bsSize='xsmall'
                                onClick={() => props.dispatch(openModalEditCustomer(item))}
                            >Edit</Button>
                            <Button
                                bsSize='xsmall'
                                bsStyle='danger'
                                onClick={() => props.dispatch(openModalDeleteCustomer(item))}
                            >Delete</Button>
                        </ButtonGroup>
                    </td>
                </tr>
            ))}
        </tbody>
    </Table>
);

export default CustomersTable;