/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 15.03.17
 */

import superagent from 'superagent';
import {
    API_CUSTOMERS,
    FETCH_CUSTOMERS_REQUEST, FETCH_CUSTOMERS_SUCCESS, FETCH_CUSTOMERS_FAILURE,
    ADD_CUSTOMER_REQUEST, ADD_CUSTOMER_SUCCESS, ADD_CUSTOMER_FAILURE,
    DELETE_CUSTOMER_REQUEST, DELETE_CUSTOMER_SUCCESS, DELETE_CUSTOMER_FAILURE,
    OPEN_MODAL_ADD_CUSTOMER, CLOSE_MODAL_ADD_CUSTOMER,
    OPEN_MODAL_DELETE_CUSTOMER, CLOSE_MODAL_DELETE_CUSTOMER,
    OPEN_MODAL_EDIT_CUSTOMER, CLOSE_MODAL_EDIT_CUSTOMER
} from './constants';

// FETCH ALL CUSTOMERS
const fetchCustomersRequest = () => ({ type: FETCH_CUSTOMERS_REQUEST });
const fetchCustomersSuccess = customers => ({ type: FETCH_CUSTOMERS_SUCCESS, customers });
const fetchCustomersFailure = error => ({ type: FETCH_CUSTOMERS_FAILURE, error });

export const fetchCustomers = () => dispatch => {
    dispatch(fetchCustomersRequest());
    superagent
        .get(API_CUSTOMERS)
        .set('Accept', 'application/json')
        .end((error, result) =>
            (error
                ? dispatch(fetchCustomersFailure(error))
                : dispatch(fetchCustomersSuccess(JSON.parse(result.text)))));
};

// MODAL ADD CUSTOMER
export const openModalAddCustomer = () => ({ type: OPEN_MODAL_ADD_CUSTOMER });
export const closeModalAddCustomer = () => ({ type: CLOSE_MODAL_ADD_CUSTOMER });

// ADD CUSTOMER
const addCustomerRequest = () => ({ type: ADD_CUSTOMER_REQUEST });
const addCustomerSuccess = customer => ({ type: ADD_CUSTOMER_SUCCESS, customer });
const addCustomerFailure = error => ({ type: ADD_CUSTOMER_FAILURE, error });

export const addCustomer = newCustomer => dispatch => {
    dispatch(addCustomerRequest());
    superagent
        .post(API_CUSTOMERS)
        .set('Accept', 'application/json')
        .send(newCustomer)
        .end((error, result) =>
            (error
                ? dispatch(addCustomerFailure(error))
                : dispatch(addCustomerSuccess(JSON.parse(result.text)))));
}

// MODAL DELETE CUSTOMER
export const openModalDeleteCustomer = customer => ({ type: OPEN_MODAL_DELETE_CUSTOMER, customer });
export const closeModalDeleteCustomer = () => ({ type: CLOSE_MODAL_DELETE_CUSTOMER });

// DELETE CUSTOMER
const deleteCustomerRequest = () => ({ type: DELETE_CUSTOMER_REQUEST });
const deleteCustomerSuccess = customer => ({ type: DELETE_CUSTOMER_SUCCESS, customer });
const deleteCustomerFailure = error => ({ type: DELETE_CUSTOMER_FAILURE, error });

export const deleteCustomer = id => dispatch => {
    dispatch(deleteCustomerRequest());
    superagent
        .delete(`${API_CUSTOMERS}/${id}`)
        .set('Accept', 'application/json')
        .end((error, result) =>
            (error
                ? dispatch(deleteCustomerFailure(error))
                : dispatch(deleteCustomerSuccess(JSON.parse(result.text)))));
}