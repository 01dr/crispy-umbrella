/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 15.03.17
 */

import superagent from 'superagent';
import {
    API_CUSTOMERS,
    FETCH_CUSTOMERS_REQUEST, FETCH_CUSTOMERS_SUCCESS, FETCH_CUSTOMERS_FAILURE
} from './constants';

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