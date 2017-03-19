/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 16.03.17
 */

import React, { Component } from 'react';
import Helmet from 'react-helmet';
import EZT from 'react-easy-transition';
import superagent from 'superagent';
import promise from 'promise';
import pagent from 'superagent-promise';
import objectAssign from 'object-assign';

import { Grid, Row, Col, PageHeader, Panel, FormGroup, ControlLabel, FormControl, InputGroup, Button, Table, Alert } from 'react-bootstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.min.css';
import Menu from '../../components/Menu/Menu';

const agent = pagent(superagent, promise);

export default class EditInvoice extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            customers: [],
            products: [],
            selectedCustomer: undefined,
            selectedProduct: undefined,
            invoiceProducts: [],
            amount: 0,
            discount: this.props.discount || 0,
            total: 0,
            customerError: '',
            invoiceProductsError: '',
            discountError: '',
            quantityError: ''
        }
    }

    componentDidMount() {
        superagent
            .get('/api/v1/customers')
            .set('Accept', 'application/json')
            .end((error, result) =>
                (error
                    ? console.log(error)
                    : this.setState({ customers: JSON.parse(result.text) })));

        superagent
            .get('/api/v1/products')
            .set('Accept', 'application/json')
            .end((error, result) =>
                (error
                    ? console.log(error)
                    : this.setState({ products: JSON.parse(result.text) })));

        agent
            .get(`/api/v1/invoices/${this.props.params.id}`)
            .set('Accept', 'application/json')
            .then(response => {
                const result = JSON.parse(response.text);
                const { discount } = result;
                this.setState({ discount });

                return agent
                    .get(`/api/v1/customers/${result.customer_id}`)
                    .set('Accept', 'application/json')
                    .then(customer => {
                        this.setState({ selectedCustomer: JSON.parse(customer.text) });
                    });
            });

        agent
            .get(`/api/v1/invoices/${this.props.params.id}/items`)
            .set('Accept', 'application/json').end()
            .then(response =>
                JSON.parse(response.text).forEach(item => agent
                        .get(`/api/v1/invoices/${this.props.params.id}/items/${item.id}`)
                        .set('Accept', 'application/json').end()
                        .then(invoiceItem => agent
                                .get(`/api/v1/products/${JSON.parse(invoiceItem.text).product_id}`)
                                .set('Accept', 'application/json').end()
                                .then(product => {
                                    const copy = Array.from(this.state.invoiceProducts);
                                    const rest = JSON.parse(product.text);
                                    const quantity = Number(JSON.parse(invoiceItem.text).quantity);
                                    const prod = {
                                        quantity,
                                        total: rest.price * quantity,
                                        ...rest
                                    };
                                    copy.push(prod);
                                    this.setState({ invoiceProducts: copy }, () => { this.countTotal() });
                                })
                        )
                )
            );
    }

    handleCustomerSelect(val) {
        this.setState({ selectedCustomer: val });
    }

    handleProductSelect(val) {
        this.setState({ selectedProduct: val });
    }

    handleAddProductToInvoice() {
        const productId = this.state.selectedProduct.id;
        const invProducts = this.state.invoiceProducts.map(m => m.id);

        if (invProducts.indexOf(productId) < 0) {
            const acc = Array.from(this.state.invoiceProducts);
            const copy = objectAssign({}, this.state.selectedProduct, {
                quantity: 1,
                total: this.state.selectedProduct.price
            });
            acc.push(copy);
            this.setState({ invoiceProducts: acc }, () => { this.countTotal() });
        }
    }

    handleChangeQuantity(item, e) {
        const copy = Array.from(this.state.invoiceProducts);
        const index = copy.indexOf(item);
        copy[index].quantity = Number(e.target.value);
        copy[index].total = copy[index].price * Number(e.target.value);
        this.setState({ invoiceProducts: copy }, () => { this.countTotal() });
    }

    handleDeleteProductFromInvoice(item) {
        const copy = Array.from(this.state.invoiceProducts);
        const deletedProduct = copy.filter(t => t.id === item.id)[0];
        const invoiceProducts = copy.filter(t => t.id !== item.id);

        if (invoiceProducts.length >= 1) {
            agent
                .get(`/api/v1/invoices/${this.props.params.id}`)
                .set('Accept', 'application/json')
                .then(invoice => {
                    const invoiceId = JSON.parse(invoice.text).id
                    return agent
                        .get(`/api/v1/invoices/${invoiceId}/items`)
                        .set('Accept', 'application/json')
                        .then(items => {
                            const itemsObj = JSON.parse(items.text);
                            const s = itemsObj.filter(t => t.product_id === deletedProduct.id);
                            return superagent
                                .delete(`/api/v1/invoices/${this.props.params.id}/items/${s[0].id}`)
                                .set('Accept', 'application/json')
                                .end();
                        });
                });

            this.setState({ invoiceProducts }, () => { this.countTotal() });
        }
    }

    handleDiscountChange(e) {
        this.setState({ discount: Number(e.target.value) }, () => { this.countTotal() });
    }

    countTotal() {
        const amount = this.state.invoiceProducts.reduce((acc, item) => acc + item.total, 0);
        const total = amount - ((amount / 100) * this.state.discount);
        this.setState({ amount, total });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { selectedCustomer, discount, total, invoiceProducts } = this.state;
        const qtyArray = invoiceProducts.map(m => m.quantity).every(i => (i >= 1 && i <= 100));

        let errors = false;
        this.setState({ customerError: '', invoiceProductsError: '', discountError: '', quantityError: '' });

        if (selectedCustomer == null) {
            errors = true;
            this.setState({ customerError: 'Customer required' });
        }

        if (invoiceProducts.length < 1) {
            errors = true;
            this.setState({ invoiceProductsError: 'Products required' });
        }

        if (!qtyArray) {
            errors = true;
            this.setState({ quantityError: 'Quantity must be from 1 to 100 items' });
        }

        if (Number(discount) > 100) {
            errors = true;
            this.setState({ discountError: 'Discount must be from 0 to 100%' });
        }

        if (!errors) {
            agent
                .put(`/api/v1/invoices/${this.props.params.id}`)
                .set('Accept', 'application/json')
                .send({ customer_id: selectedCustomer.id, discount, total })
                .then(invoice => {
                    const invoiceId = JSON.parse(invoice.text).id
                    return agent
                        .get(`/api/v1/invoices/${invoiceId}/items`)
                        .set('Accept', 'application/json')
                        .then(items => {
                            const itemsObj = JSON.parse(items.text);
                            const newProducts = invoiceProducts.filter(t =>
                            itemsObj.map(m => m.product_id).indexOf(t.id) < 0);

                            newProducts.forEach(item =>
                                agent
                                    .post(`/api/v1/invoices/${this.props.params.id}/items`)
                                    .set('Accept', 'application/json')
                                    .send({ product_id: item.id, ...item })
                                    .end());

                            itemsObj.forEach(item => {
                                const s = invoiceProducts.filter(t => t.id === item.product_id);
                                const updatedItem = objectAssign({}, item, ...s);
                                return agent
                                    .put(`/api/v1/invoices/${this.props.params.id}/items/${item.id}`)
                                    .set('Accept', 'application/json')
                                    .send(updatedItem)
                                    .then(() => { this.props.router.push('/invoices') });
                            });
                        });
                });
        }
    }

    render() {
        const { invoiceProducts, customerError, invoiceProductsError, discountError, quantityError } = this.state;

        return (
            <div>
                <Helmet title='Edit invoice | Invoice App'/>
                <Menu/>
                <EZT
                    initialStyle={{ opacity: 0 }}
                    transition="opacity 0.3s ease-in"
                    finalStyle={{ opacity: 1 }}
                >
                    <Grid>
                        <Row>
                            <Col xs={12}>
                                <PageHeader>
                                    Edit invoice id#{this.props.params.id}
                                </PageHeader>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} lg={4}>
                                <FormGroup>
                                    <ControlLabel>Discount %</ControlLabel>
                                    <InputGroup>
                                        <FormControl
                                            type='number'
                                            min='0'
                                            max='100'
                                            value={this.state.discount}
                                            onChange={::this.handleDiscountChange}
                                        />
                                        <InputGroup.Addon>%</InputGroup.Addon>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Customer</ControlLabel>
                                    <Select
                                        name='add-invoice-customer'
                                        valueKey='id'
                                        labelKey='name'
                                        options={this.state.customers}
                                        value={this.state.selectedCustomer}
                                        onChange={::this.handleCustomerSelect}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Product</ControlLabel>
                                    <InputGroup>
                                        <Select
                                            name='add-invoice-product'
                                            valueKey='id'
                                            labelKey='name'
                                            options={this.state.products}
                                            value={this.state.selectedProduct}
                                            onChange={::this.handleProductSelect}
                                        />
                                        <InputGroup.Button>
                                            <Button onClick={::this.handleAddProductToInvoice}>Add</Button>
                                        </InputGroup.Button>
                                    </InputGroup>
                                </FormGroup>

                                {customerError && <Alert bsStyle='danger'>{customerError}</Alert>}
                                {invoiceProductsError && <Alert bsStyle='danger'>{invoiceProductsError}</Alert>}
                                {discountError && <Alert bsStyle='danger'>{discountError}</Alert>}
                                {quantityError && <Alert bsStyle='danger'>{quantityError}</Alert>}

                                <div>
                                    <h4><b>Total: {this.state.total.toFixed(2)}</b></h4>
                                    <h5>Amount: {this.state.amount.toFixed(2)}</h5>
                                    <h5>Discount: {this.state.discount}%</h5>
                                    <Button bsStyle="primary" onClick={::this.handleSubmit}>Update invoice</Button>
                                </div>
                            </Col>
                            <Col xs={12} lg={8}>
                                <Panel>
                                    <Table responsive hover>
                                        <thead>
                                        <tr>
                                            <th className='col-xs-3'>Name</th>
                                            <th className='col-xs-2'>Price</th>
                                            <th className='col-xs-2'>Total</th>
                                            <th className='col-xs-3'>Quantity</th>
                                            <td className='col-xs-2'/>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        {this.state.invoiceProducts.map(item =>
                                            (
                                                <tr key={`ip${item.id}`}>
                                                    <td className='col-xs-3'>{item.name}</td>
                                                    <td className='col-xs-2'>{Number(item.price).toFixed(2)}</td>
                                                    <td className='col-xs-2'>{Number(item.total).toFixed(2)}</td>
                                                    <td className='col-xs-3'>
                                                        <FormControl
                                                            type='number'
                                                            min='1'
                                                            max='100'
                                                            placeholder='qty'
                                                            value={item.quantity}
                                                            onChange={this.handleChangeQuantity.bind(this, item)}
                                                        />
                                                    </td>
                                                    <td className='col-xs-2'>
                                                        <Button
                                                            bsStyle='danger'
                                                            disabled={invoiceProducts.length === 1}
                                                            onClick={this.handleDeleteProductFromInvoice.bind(this, item)}
                                                        >Delete</Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Panel>
                            </Col>
                        </Row>
                    </Grid>
                </EZT>
            </div>
        )
    }
}