/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 15.03.17
 */

import {
    FETCH_CUSTOMERS_SUCCESS
} from '../actions/constants';

const customersList = (state = [], action) => {
    switch (action.type) {
    case FETCH_CUSTOMERS_SUCCESS:
        return action.customers;

    default:
        return state;
    }
}

export default { customersList }