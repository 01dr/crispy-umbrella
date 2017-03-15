/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 16.03.17
 */

import superagent from 'superagent';
import {
    API_INVOICES,
    FETCH_INVOICES_REQUEST, FETCH_INVOICES_SUCCESS, FETCH_INVOICES_FAILURE
} from './constants';

// FETCH ALL INVOICES
const fetchInvoicesRequest = () => ({ type: FETCH_INVOICES_REQUEST });
const fetchInvoicesSuccess = invoices => ({ type: FETCH_INVOICES_SUCCESS, invoices });
const fetchInvoicesFailure = error => ({ type: FETCH_INVOICES_FAILURE, error });

export const fetchInvoices = () => dispatch => {
    dispatch(fetchInvoicesRequest());
    superagent
        .get(API_INVOICES)
        .set('Accept', 'application/json')
        .end((error, result) =>
            (error
                ? dispatch(fetchInvoicesFailure(error))
                : dispatch(fetchInvoicesSuccess(JSON.parse(result.text)))));
};