/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 16.03.17
 */

import * as db from '../db';

export const getAllInvoiceItems = (request, response) => {
    db.InvoiceItem
        .findAll({ where: { invoice_id: request.params.invoice_id } })
        .then(invoiceItems => {
            response.json(invoiceItems);
        });
}

export const addInvoiceItem = (request, response) => {
    const { product_id, quantity } = request.body;
    const item = db.InvoiceItem.build({ product_id, quantity });

    item
        .set('invoice_id', request.params.invoice_id)
        .save()
        .then(invoiceItem => {
            response.json(invoiceItem);
        });
}

export const getInvoiceItem = (request, response) => {
    db.InvoiceItem
        .findById(request.params.id)
        .then(invoiceItem => {
            response.json(invoiceItem);
        });
}

export const patchInvoiceItem = (request, response) => {
    const { product_id, quantity } = request.body;

    db.InvoiceItem
        .findById(request.params.id)
        .then(invoiceItem => {
            invoiceItem
                .update({ product_id, quantity })
                .then(updatedInvoiceItem => {
                    response.json(updatedInvoiceItem);
                });
        });
}

export const deleteInvoiceItem = (request, response) => {
    db.InvoiceItem
        .findById(request.params.id)
        .then(invoiceItem => {
            invoiceItem
                .destroy()
                .then(result => {
                    response.json(result);
                });
        });
}