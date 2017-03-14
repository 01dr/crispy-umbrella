/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 15.03.17
 */

const path = require('path');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(`sqlite://${path.join(__dirname, 'invoices.sqlite')}`, {
    dialect: 'sqlite',
    storage: path.join(__dirname, 'invoices.sqlite')
});

export const Customer = sequelize.define('customers', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING
    }
});

export const Product = sequelize.define('products', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.DECIMAL
    }
});

export const Invoice = sequelize.define('invoices', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    customer_id: {
        type: Sequelize.INTEGER
    },
    discount: {
        type: Sequelize.DECIMAL
    },
    total: {
        type: Sequelize.DECIMAL
    }
});

export const InvoiceItem = sequelize.define('invoice_items', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    invoice_id: {
        type: Sequelize.INTEGER
    },
    product_id: {
        type: Sequelize.INTEGER
    },
    quantity: {
        type: Sequelize.DECIMAL
    }
});

sequelize
    .sync()
    .then(() => { Customer.truncate() })
    .then(() => { Product.truncate() })
    .then(() => { Invoice.truncate() })
    .then(() => { InvoiceItem.truncate() })
    .then(() => {
        Customer.create({
            name: 'Mark Benson',
            address: '353 Rochester St, Rialto FL 43250',
            phone: '555-534-2342'
        });

        Customer.create({
            name: 'Bob Smith',
            address: '215 Market St, Dansville CA 94325',
            phone: '555-534-2342'
        });

        Customer.create({
            name: 'John Draper',
            address: '890 Main St, Fontana IL 31450',
            phone: '555-534-2342'
        });

        Product.create({
            name: 'Parachute Pants',
            price: 29.99
        });

        Product.create({
            name: 'Phone Holder',
            price: 9.99
        });

        Product.create({
            name: 'Pet Rock',
            price: 5.99
        });

        Product.create({
            name: 'Egg Timer',
            price: 15.99
        });

        Product.create({
            name: 'Neon Green Hat',
            price: 21.99
        });
    })
    .catch(e => { console.log('ERROR SYNCING WITH DB', e) });