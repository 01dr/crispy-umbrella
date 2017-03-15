/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 14.03.17
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Grid, Row, Col, PageHeader, Button } from 'react-bootstrap';
import Menu from '../../components/Menu/Menu';
import ProductsTable from '../../components/ProductsTable/ProductsTable';
import ModalAddProduct from '../../components/ModalAddProduct/ModalAddProduct';
import ModalDeleteProduct from '../../components/ModalDeleteProduct/ModalDeleteProduct';
import ModalEditProduct from '../../components/ModalEditProduct/ModalEditProduct';

import { fetchProducts, openModalAddProduct } from '../../actions/productsActions';

class Products extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchProducts());
    }

    render() {
        const {
            dispatch,
            productsList,
            modalAddProduct,
            modalDeleteProductIsOpen,
            modalDeleteProductCurrent,
            modalEditProductIsOpen,
            modalEditProductCurrent
        } = this.props;

        return (
            <div>
                <Menu/>
                <Grid>
                    <Row>
                        <Col xs={12}>
                            <PageHeader>
                                Product list <Button onClick={ () => dispatch(openModalAddProduct()) }>Create</Button>
                            </PageHeader>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <ProductsTable productsList={productsList} dispatch={dispatch}/>
                        </Col>
                    </Row>
                </Grid>

                <ModalAddProduct
                    open={modalAddProduct}
                    dispatch={dispatch}/>
                <ModalDeleteProduct
                    open={modalDeleteProductIsOpen}
                    product={modalDeleteProductCurrent}
                    dispatch={dispatch}/>
                <ModalEditProduct
                    open={modalEditProductIsOpen}
                    product={modalEditProductCurrent}
                    dispatch={dispatch}/>
            </div>
        )
    }
}

export default connect(state => ({
    productsList: state.productsList,
    modalAddProduct: state.modalAddProduct,
    modalDeleteProductIsOpen: state.modalDeleteProduct.open,
    modalDeleteProductCurrent: state.modalDeleteProduct.product,
    modalEditProductIsOpen: state.modalEditProduct.open,
    modalEditProductCurrent: state.modalEditProduct.product
}))(Products);