/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 15.03.17
 */

import superagent from 'superagent';
import {
    API_PRODUCTS,
    FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILURE,
    ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS, ADD_PRODUCT_FAILURE,
    DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE,
    UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAILURE,
    OPEN_MODAL_ADD_PRODUCT, CLOSE_MODAL_ADD_PRODUCT,
    OPEN_MODAL_DELETE_PRODUCT, CLOSE_MODAL_DELETE_PRODUCT,
    OPEN_MODAL_EDIT_PRODUCT, CLOSE_MODAL_EDIT_PRODUCT
} from './constants';

// FETCH ALL PRODUCTS
const fetchProductsRequest = () => ({ type: FETCH_PRODUCTS_REQUEST });
const fetchProductsSuccess = products => ({ type: FETCH_PRODUCTS_SUCCESS, products });
const fetchProductsFailure = error => ({ type: FETCH_PRODUCTS_FAILURE, error });

export const fetchProducts = () => dispatch => {
    dispatch(fetchProductsRequest());
    superagent
        .get(API_PRODUCTS)
        .set('Accept', 'application/json')
        .end((error, result) =>
            (error
                ? dispatch(fetchProductsFailure(error))
                : dispatch(fetchProductsSuccess(JSON.parse(result.text)))));
};

// MODAL ADD PRODUCT
export const openModalAddProduct = () => ({ type: OPEN_MODAL_ADD_PRODUCT });
export const closeModalAddProduct = () => ({ type: CLOSE_MODAL_ADD_PRODUCT });

// ADD PRODUCT
const addProductRequest = () => ({ type: ADD_PRODUCT_REQUEST });
const addProductSuccess = product => ({ type: ADD_PRODUCT_SUCCESS, product });
const addProductFailure = error => ({ type: ADD_PRODUCT_FAILURE, error });

export const addProduct = newProduct => dispatch => {
    dispatch(addProductRequest());
    superagent
        .post(API_PRODUCTS)
        .set('Accept', 'application/json')
        .send(newProduct)
        .end((error, result) =>
            (error
                ? dispatch(addProductFailure(error))
                : dispatch(addProductSuccess(JSON.parse(result.text)))));
}

// MODAL DELETE PRODUCT
export const openModalDeleteProduct = product => ({ type: OPEN_MODAL_DELETE_PRODUCT, product });
export const closeModalDeleteProduct = () => ({ type: CLOSE_MODAL_DELETE_PRODUCT });

// DELETE PRODUCT
const deleteProductRequest = () => ({ type: DELETE_PRODUCT_REQUEST });
const deleteProductSuccess = product => ({ type: DELETE_PRODUCT_SUCCESS, product });
const deleteProductFailure = error => ({ type: DELETE_PRODUCT_FAILURE, error });

export const deleteProduct = id => dispatch => {
    dispatch(deleteProductRequest());
    superagent
        .delete(`${API_PRODUCTS}/${id}`)
        .set('Accept', 'application/json')
        .end((error, result) =>
            (error
                ? dispatch(deleteProductFailure(error))
                : dispatch(deleteProductSuccess(JSON.parse(result.text)))));
}

// MODAL EDIT PRODUCT
export const openModalEditProduct = product => ({ type: OPEN_MODAL_EDIT_PRODUCT, product });
export const closeModalEditProduct = () => ({ type: CLOSE_MODAL_EDIT_PRODUCT });

// UPDATE PRODUCT
const updateProductRequest = () => ({ type: UPDATE_PRODUCT_REQUEST });
const updateProductSuccess = product => ({ type: UPDATE_PRODUCT_SUCCESS, product });
const updateProductFailure = error => ({ type: UPDATE_PRODUCT_FAILURE, error });

export const updateProduct = product => dispatch => {
    dispatch(updateProductRequest());
    const { id } = product;
    superagent
        .put(`${API_PRODUCTS}/${id}`)
        .set('Accept', 'application/json')
        .send(product)
        .end((error, result) =>
            (error
                ? dispatch(updateProductFailure(error))
                : dispatch(updateProductSuccess(JSON.parse(result.text)))));
}