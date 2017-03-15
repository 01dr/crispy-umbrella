/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 15.03.17
 */

import {
    FETCH_CUSTOMERS_SUCCESS,
    ADD_CUSTOMER_SUCCESS,
    DELETE_CUSTOMER_SUCCESS,
    UPDATE_CUSTOMER_SUCCESS,
    OPEN_MODAL_ADD_CUSTOMER, CLOSE_MODAL_ADD_CUSTOMER,
    OPEN_MODAL_DELETE_CUSTOMER, CLOSE_MODAL_DELETE_CUSTOMER,
    OPEN_MODAL_EDIT_CUSTOMER, CLOSE_MODAL_EDIT_CUSTOMER
} from '../actions/constants';

const customersList = (state = [], action) => {
    const newState = Array.from(state);

    switch (action.type) {
    case FETCH_CUSTOMERS_SUCCESS:
        return action.customers;

    case ADD_CUSTOMER_SUCCESS:
        newState.push(action.customer);
        return newState;

    case DELETE_CUSTOMER_SUCCESS:
        newState.splice(newState.indexOf(action.customer), 1);
        return newState;

    case UPDATE_CUSTOMER_SUCCESS:
        return newState.map(item =>
            (item.id === action.customer.id
                ? action.customer
                : item));

    default:
        return state;
    }
}

const modalAddCustomer = (state = false, action) => {
    switch (action.type) {
    case OPEN_MODAL_ADD_CUSTOMER:
        return true;
    case CLOSE_MODAL_ADD_CUSTOMER:
        return false;
    default:
        return state;
    }
}

const modalDeleteCustomer = (state = {
    open: false,
    customer: {}
}, action) => {
    switch (action.type) {
    case OPEN_MODAL_DELETE_CUSTOMER:
        return { open: true, customer: action.customer };
    case CLOSE_MODAL_DELETE_CUSTOMER:
        return { open: false, customer: {} };
    default:
        return state;
    }
}

const modalEditCustomer = (state = {
    open: false,
    customer: {}
}, action) => {
    switch (action.type) {
    case OPEN_MODAL_EDIT_CUSTOMER:
        return { open: true, customer: action.customer };
    case CLOSE_MODAL_EDIT_CUSTOMER:
        return { open: false, customer: {} };
    default:
        return state;
    }
}

export default { customersList, modalAddCustomer, modalDeleteCustomer, modalEditCustomer }