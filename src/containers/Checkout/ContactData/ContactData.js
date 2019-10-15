import React, { Component } from 'react';
import Axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (e) => {
        e.preventDefault(); //prevent form submit reloading the page
    
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Aarón Parres',
                address: {
                    street: 'La tercia',
                    zipCode: '00000',
                    country: 'Españita'
                },
                email: 'jate@mate.com'
            },
            deliveryMethod: 'rapidico'
        };

        Axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({ loading: false, /* purchasing: false */ });
            })
            .catch(error => {
                console.log(error);
                this.setState({ loading: false, /* purchasing: false */ });
            });
    }

    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                    <input className={classes.Input} type="email" name="email" placeholder="Your Email" />
                    <input className={classes.Input} type="text" name="street" placeholder="Street" />
                    <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
                    <Button btnType="Success" clickedButton={this.orderHandler}>ORDER</Button>
                </form>
            </div>
        );
    }
}
export default ContactData;