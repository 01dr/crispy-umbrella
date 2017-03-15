/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 15.03.17
 */

import {
    FETCH_CUSTOMERS_SUCCESS,
    ADD_CUSTOMER_SUCCESS,
    DELETE_CUSTOMER_SUCCESS,
    OPEN_MODAL_ADD_CUSTOMER, CLOSE_MODAL_ADD_CUSTOMER,
    OPEN_MODAL_DELETE_CUSTOMER, CLOSE_MODAL_DELETE_CUSTOMER
} from '../actions/constants';

const customersList = (state = [], action) => {
    switch (action.type) {
    case FETCH_CUSTOMERS_SUCCESS:
        return action.customers;
    case ADD_CUSTOMER_SUCCESS:
        const stateAfterAdd = Array.from(state);
        stateAfterAdd.push(action.customer);
        return stateAfterAdd;
    case DELETE_CUSTOMER_SUCCESS:
        const stateAfterDelete = Array.from(state);
        const index = stateAfterDelete.indexOf(action.customer);
        stateAfterDelete.splice(index, 1);
        return stateAfterDelete;
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
        return { open: true, customer: action.customer};
    case CLOSE_MODAL_DELETE_CUSTOMER:
        return { open: false, customer: {} };
    default:
        return state;
    }
}

export default { customersList, modalAddCustomer, modalDeleteCustomer }