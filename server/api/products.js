/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 15.03.17
 */

import * as db from '../db';

export const getAllProducts = (request, response) => {
    db.Product
        .findAll()
        .then(products => {
            response.json(products);
        });
};

export const addProduct = (request, response) => {
    const { name, price } = request.body;
    const product = db.Product.build({ name, price });

    product
        .save()
        .then(newProduct => {
            response.json(newProduct);
        });
};

export const getProduct = (request, response) => {
    db.Product
        .findById(request.params.product_id)
        .then(product => {
            response.json(product);
        });
};

export const patchProduct = (request, response) => {
    const { name, price } = request.body;

    db.Product
        .findById(request.params.product_id)
        .then(product => {
            product
                .update({ name, price })
                .then(updatedProduct => {
                    response.json(updatedProduct);
                });
        });
};

export const deleteProduct = (request, response) => {
    db.Product
        .findById(request.params.product_id)
        .then(product => {
            product
                .destroy()
                .then(result => {
                    response.json(result);
                });
        });
};