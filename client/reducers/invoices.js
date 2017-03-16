/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 16.03.17
 */

import {
    FETCH_INVOICES_SUCCESS,
    DELETE_INVOICE_SUCCESS,
    OPEN_MODAL_DELETE_INVOICE, CLOSE_MODAL_DELETE_INVOICE
} from '../actions/constants';

const invoicesList = (state = [], action) => {
    const newState = Array.from(state);

    switch (action.type) {
    case FETCH_INVOICES_SUCCESS:
        return action.invoices;

    case DELETE_INVOICE_SUCCESS:
        return newState.filter(item => item.id !== action.invoice.id);

    default:
        return state;
    }
}

const modalDeleteInvoice = (state = {
    open: false,
    invoice: {}
}, action) => {
    switch (action.type) {
    case OPEN_MODAL_DELETE_INVOICE:
        return { open: true, invoice: action.invoice };
    case CLOSE_MODAL_DELETE_INVOICE:
        return { open: false, invoice: {} };
    default:
        return state;
    }
}

export default { invoicesList, modalDeleteInvoice }