import React, { Component } from 'react';
import { Route } from 'react-router-dom';
// import Axios from '../../axios-orders';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

export class Checkout extends Component {
    state = { //dummy data to test ingredients
        ingredients: {
            salad: 1,
            bacon: 1,
            meat: 1,
            cheese: 1
        }
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            // console.log(param) // ['salad', '1']
            ingredients[param[0]] = +param[1]; // Unary Operator By adding a + sign before a String, it will be converted into a number
            // console.log(ingredients);
        }
        this.setState({ ingredients: ingredients })
    }

    checkoutCancelledHandler = () => {
        console.log('canceling')
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        console.log('continuing')
        this.props.history.replace('/checkout/contact-data');
    }


    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                {/* <Route path={this.props.match.path + '/contact-data'} component={ContactData} /> */}
                <Route 
                    path={this.props.match.path + '/contact-data'}
                    render={() => (<ContactData ingredients={this.state.ingredients} />)} />
            </div>
        );
    }
}

export default Checkout;
