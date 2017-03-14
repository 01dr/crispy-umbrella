/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 15.03.17
 */

import * as db from '../db';

export const getAllCustomers = (request, response) => {
    db.Customer
        .findAll()
        .then(customers => {
            response.json(customers);
        });
};

export const addCustomer = (request, response) => {
    const { name, address, phone } = request.body;
    const customer = db.Customer.build({ name, address, phone });

    customer
        .save()
        .then(newCustomer => {
            response.json(newCustomer);
        });
};

export const getCustomer = (request, response) => {
    db.Customer
        .findById(request.params.customer_id)
        .then(customer => {
            response.json(customer);
        });
};

export const patchCustomer = (request, response) => {
    const { name, address, phone } = request.body;

    db.Customer
        .findById(request.params.customer_id)
        .then(customer => {
            customer
                .update({ name, address, phone })
                .then(updatedCustomer => {
                    response.json(updatedCustomer);
                });
        });
};

export const deleteCustomer = (request, response) => {
    db.Customer
        .findById(request.params.customer_id)
        .then(customer => {
            customer
                .destroy()
                .then(result => {
                    response.json(result);
                });
        });
};