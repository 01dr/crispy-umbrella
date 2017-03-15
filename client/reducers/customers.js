/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 15.03.17
 */

import {
    FETCH_CUSTOMERS_SUCCESS,
    ADD_CUSTOMER_SUCCESS,
    OPEN_MODAL_ADD_CUSTOMER, CLOSE_MODAL_ADD_CUSTOMER
} from '../actions/constants';

const customersList = (state = [], action) => {
    switch (action.type) {
    case FETCH_CUSTOMERS_SUCCESS:
        return action.customers;
    case ADD_CUSTOMER_SUCCESS:
        const newState = Array.from(state);
        newState.push(action.customer);
        return newState;
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

export default { customersList, modalAddCustomer }