/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 15.03.17
 */

import {
    FETCH_PRODUCTS_SUCCESS,
    ADD_PRODUCT_SUCCESS,
    DELETE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_SUCCESS,
    OPEN_MODAL_ADD_PRODUCT, CLOSE_MODAL_ADD_PRODUCT,
    OPEN_MODAL_DELETE_PRODUCT, CLOSE_MODAL_DELETE_PRODUCT,
    OPEN_MODAL_EDIT_PRODUCT, CLOSE_MODAL_EDIT_PRODUCT
} from '../actions/constants';

const productsList = (state = [], action) => {
    const newState = Array.from(state);

    switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
        return action.products;

    case ADD_PRODUCT_SUCCESS:
        newState.push(action.product);
        return newState;

    case DELETE_PRODUCT_SUCCESS:
        newState.splice(newState.indexOf(action.product), 1);
        return newState;

    case UPDATE_PRODUCT_SUCCESS:
        return newState.map(item =>
            (item.id === action.product.id
                ? action.product
                : item));

    default:
        return state;
    }
}

const modalAddProduct = (state = false, action) => {
    switch (action.type) {
    case OPEN_MODAL_ADD_PRODUCT:
        return true;
    case CLOSE_MODAL_ADD_PRODUCT:
        return false;
    default:
        return state;
    }
}

const modalDeleteProduct = (state = {
    open: false,
    product: {}
}, action) => {
    switch (action.type) {
    case OPEN_MODAL_DELETE_PRODUCT:
        return { open: true, product: action.product };
    case CLOSE_MODAL_DELETE_PRODUCT:
        return { open: false, product: {} };
    default:
        return state;
    }
}

const modalEditProduct = (state = {
    open: false,
    product: {}
}, action) => {
    switch (action.type) {
    case OPEN_MODAL_EDIT_PRODUCT:
        return { open: true, product: action.product };
    case CLOSE_MODAL_EDIT_PRODUCT:
        return { open: false, product: {} };
    default:
        return state;
    }
}

export default { productsList, modalAddProduct, modalDeleteProduct, modalEditProduct }