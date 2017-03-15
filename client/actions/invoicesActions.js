/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 16.03.17
 */

import superagent from 'superagent';
import {
    API_INVOICES,
    FETCH_INVOICES_REQUEST, FETCH_INVOICES_SUCCESS, FETCH_INVOICES_FAILURE,
    DELETE_INVOICE_REQUEST, DELETE_INVOICE_SUCCESS, DELETE_INVOICE_FAILURE,
    OPEN_MODAL_DELETE_INVOICE, CLOSE_MODAL_DELETE_INVOICE
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

// MODAL DELETE INVOICES
export const openModalDeleteInvoice = invoice => ({ type: OPEN_MODAL_DELETE_INVOICE, invoice });
export const closeModalDeleteInvoice = () => ({ type: CLOSE_MODAL_DELETE_INVOICE });

// DELETE INVOICES
const deleteInvoiceRequest = () => ({ type: DELETE_INVOICE_REQUEST });
const deleteInvoiceSuccess = invoice => ({ type: DELETE_INVOICE_SUCCESS, invoice });
const deleteInvoiceFailure = error => ({ type: DELETE_INVOICE_FAILURE, error });

export const deleteInvoice = id => dispatch => {
    dispatch(deleteInvoiceRequest());
    superagent
        .delete(`${API_INVOICES}/${id}`)
        .set('Accept', 'application/json')
        .end((error, result) =>
            (error
                ? dispatch(deleteInvoiceFailure(error))
                : dispatch(deleteInvoiceSuccess(JSON.parse(result.text)))));
}