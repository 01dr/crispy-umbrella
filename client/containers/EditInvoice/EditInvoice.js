/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 16.03.17
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import superagent from 'superagent';
import promise from 'promise';
import pagent from 'superagent-promise';
import objectAssign from 'object-assign';

import { Grid, Row, Col, PageHeader, Panel, FormGroup, ControlLabel, FormControl, InputGroup, Button, Table } from 'react-bootstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.min.css';
import Menu from '../../components/Menu/Menu';

const agent = pagent(superagent, promise);

class EditInvoice extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            customers: [],
            products: [],
            selectedCustomer: {},
            selectedProduct: {},
            invoiceProducts: [],
            amount: 0,
            discount: this.props.discount || 0,
            total: 0
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
            .end()
            .then(response => {
                const result = JSON.parse(response.text);
                const { discount } = result;
                this.setState({ discount });

                return agent
                    .get(`/api/v1/customers/${result.customer_id}`)
                    .set('Accept', 'application/json')
                    .end()
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
        const acc = Array.from(this.state.invoiceProducts);
        const copy = objectAssign({}, this.state.selectedProduct, {
            quantity: 1,
            total: this.state.selectedProduct.price
        });
        acc.push(copy);
        this.setState({ invoiceProducts: acc }, () => { this.countTotal() });
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
        const index = copy.indexOf(item);
        copy.splice(index, 1);
        this.setState({ invoiceProducts: copy }, () => { this.countTotal() });
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

        agent
            .post('/api/v1/invoices')
            .set('Accept', 'application/json')
            .send({ customer_id: selectedCustomer.id, discount, total })
            .end()
            .then(response => {
                invoiceProducts.forEach(item =>
                    agent
                        .post(`/api/v1/invoices/${response.body.id}/items`)
                        .set('Accept', 'application/json')
                        .send({ product_id: item.id, ...item })
                        .end()
                        .then(() => {
                            this.props.router.push('/invoices');
                        }))
            });
    }

    render() {
        return (
            <div>
                <Menu/>
                <Grid>
                    <Row>
                        <Col xs={12}>
                            <PageHeader>
                                Edit invoice id#{this.props.params.id}
                            </PageHeader>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} lg={5}>
                            <Panel>
                                <FormGroup>
                                    <ControlLabel>Discount %</ControlLabel>
                                    <FormControl
                                        type="text"
                                        value={this.state.discount}
                                        onChange={::this.handleDiscountChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Customer</ControlLabel>
                                    <Select
                                        name="add-invoice-customer"
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
                                            name="add-invoice-product"
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
                            </Panel>
                            <Panel>
                                <h4><b>Total: {this.state.total.toFixed(2)}</b></h4>
                                <h5>Amount: {this.state.amount.toFixed(2)}</h5>
                                <h5>Discount: {this.state.discount}%</h5>
                                <Button bsStyle="primary" onClick={::this.handleSubmit}>Create invoice</Button>
                            </Panel>
                        </Col>
                        <Col xs={12} lg={7}>
                            <Panel>
                                <Table responsive>
                                    <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Total</th>
                                        <th>Quantity</th>
                                        <td/>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {this.state.invoiceProducts.map(item =>
                                        (
                                            <tr key={`ip${item.id}`}>
                                                <td>{item.name}</td>
                                                <td>{item.price}</td>
                                                <td>{item.total}</td>
                                                <td>
                                                    <FormControl
                                                        placeholder="qty"
                                                        value={item.quantity}
                                                        onChange={this.handleChangeQuantity.bind(this, item)}
                                                    />
                                                </td>
                                                <td>
                                                    <Button
                                                        bsStyle='danger'
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
            </div>
        )
    }
}

export default connect(() => ({}))(EditInvoice);