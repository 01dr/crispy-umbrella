/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 15.03.17
 */

import * as db from '../db';

export const getAllInvoices = (request, response) => {
    db.Invoice
        .findAll()
        .then(invoices => {
            response.json(invoices);
        });
};

export const addInvoice = (request, response) => {
    const { customer_id, discount, total } = request.body;
    const invoice = db.Invoice.build({ customer_id, discount, total });

    invoice
        .save()
        .then(newInvoice => {
            response.json(newInvoice);
        });
};

export const getInvoice = (request, response) => {
    db.Invoice
        .findById(request.params.invoice_id)
        .then(invoice => {
            response.json(invoice);
        });
};

export const patchInvoice = (request, response) => {
    const { customer_id, discount, total } = request.body;

    db.Invoice
        .findById(request.params.invoice_id)
        .then(invoice => {
            invoice
                .update({ customer_id, discount, total })
                .then(updatedInvoice => {
                    response.json(updatedInvoice);
                });
        });
};

export const deleteInvoice = (request, response) => {
    db.Invoice
        .findById(request.params.invoice_id)
        .then(invoice => {
            invoice
                .destroy()
                .then(result => {
                    response.json(result);
                });
        });
};