/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 16.03.17
 */

import {
    FETCH_INVOICES_SUCCESS
} from '../actions/constants';

const invoicesList = (state = [], action) => {
    switch (action.type) {
    case FETCH_INVOICES_SUCCESS:
        return action.invoices;

    default:
        return state;
    }
}

export default { invoicesList }