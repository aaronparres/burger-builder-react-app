import React, { Component, lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import Spinner from './components/UI/Spinner/Spinner';

const LazyAuth = lazy(() => import('./containers/Auth/Auth'));
const LazyOrders = lazy(() => import('./containers/Orders/Orders'));
const LazyCheckout = lazy(() => import ('./containers/Checkout/Checkout'));

class App extends Component {

    componentDidMount() {
        this.props.onTryAutoSignin();
    }

    render() {

        let routes = (
            <Switch>
                <Route path="/login" render={() => <Suspense fallback={<Spinner />}><LazyAuth /></Suspense>} />
                <Route path="/" component={BurgerBuilder} />
                <Redirect to="/" />
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/orders" component={() => <Suspense fallback={<Spinner />}><LazyOrders /></Suspense>} />
                    <Route path="/checkout" component={() => <Suspense fallback={<Spinner />}><LazyCheckout /></Suspense>} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/login" render={() => <Suspense fallback={<Spinner />}><LazyAuth /></Suspense>} />
                    <Route path="/" component={BurgerBuilder} />
                    <Redirect to="/" />
                </Switch>
            );
        }
        return (
            <div>
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignin: () => dispatch(actions.authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
