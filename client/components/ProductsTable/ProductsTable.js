/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 15.03.17
 */

import React from 'react';
import { Table, Button, ButtonGroup } from 'react-bootstrap';

import { openModalDeleteProduct, openModalEditProduct } from '../../actions/productsActions';

const ProductsTable = props => (
    <Table responsive hover>
        <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th/>
            </tr>
        </thead>

        <tbody>
            {props.productsList.map(item => (
                <tr key={item.id}>
                    <td className='col-xs-1'>{item.id}</td>
                    <td className='col-xs-3'>{item.name}</td>
                    <td className='col-xs-3'>{item.price}</td>
                    <td className='col-xs-5 text-right'>
                        <ButtonGroup>
                            <Button
                                bsSize='xsmall'
                                onClick={() => props.dispatch(openModalEditProduct(item))}
                            >Edit</Button>
                            <Button
                                bsStyle='danger'
                                bsSize='xsmall'
                                onClick={() => props.dispatch(openModalDeleteProduct(item))}
                            >Delete</Button>
                        </ButtonGroup>
                    </td>
                </tr>
            ))}
        </tbody>
    </Table>
);

export default ProductsTable;