import React, { Fragment } from 'react';

import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients).map(ingType => {
        return (
            <li key={ingType}>
                <span style={{ textTransform: 'capitalize' }}>{ingType}</span>: {props.ingredients[ingType]}
            </li>
        );
    });

    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}€</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clickedButton={props.purchaseCanceled}>CANCEL</Button>
            <Button btnType="Success" clickedButton={props.purchaseContinued}>CONTINUE</Button>
        </Fragment>
    );
};

export default OrderSummary;