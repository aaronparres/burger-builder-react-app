import React, { Component, Fragment } from 'react';
import Axios from '../../axios-orders';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import PopUp from '../../components/UI/PopUp/PopUp';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import Emoji from '../../components/UI/Emoji/Emoji';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(ingType => ingredients[ingType])
            .reduce((sum, elem) => {
                return sum + elem;
            }, 0);

        return sum > 0;
    }

    orderNowHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        const queryParams = [];
        for (let i in this.props.ings) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]));
        }
        queryParams.push('price=' + this.props.prc);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });

    }

    render() {
        const disabledInfo = { ...this.props.ings };
        for (let ing in disabledInfo) {
            disabledInfo[ing] = disabledInfo[ing] <= 0 // true or false
        }
        //console.log(disabledInfo);

        let orderSummary = null;
        let burger = this.state.error ? <p>We ran out of ingredients, sorry <Emoji symbol="😭" label="cry" /></p> : <Spinner />;

        if (this.props.ings) {
            burger = (
                <Fragment>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        add={this.props.onIngredientAdded}
                        remove={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.prc}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        orderNow={this.orderNowHandler} />
                </Fragment>
            );
            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ings}
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    price={this.props.prc}
                />
            );
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Fragment>
                <PopUp show={this.state.purchasing} popUpClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </PopUp>
                {burger}
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        prc: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, Axios));
