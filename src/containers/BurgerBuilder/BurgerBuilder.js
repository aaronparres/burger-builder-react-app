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
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(ingType => ingredients[ingType])
            .reduce((sum, elem) => {
                return sum + elem;
            }, 0);

        return sum > 0;
    }

    orderNowHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/login');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.onPurchaseInit();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = { ...this.props.ings };
        for (let ing in disabledInfo) {
            disabledInfo[ing] = disabledInfo[ing] <= 0 // true or false
        }
        //console.log(disabledInfo);

        let orderSummary = null;
        let burger = this.props.error ? <p>We ran out of ingredients, sorry <Emoji symbol="😭" label="cry" /></p> : <Spinner />;

        if (this.props.ings) {
            burger = (
                <Fragment>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        isAuth={this.props.isAuthenticated}
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
        ings: state.burgerBuilder.ingredients,
        prc: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onPurchaseInit: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, Axios));
