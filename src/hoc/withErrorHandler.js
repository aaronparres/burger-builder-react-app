import React, { Component, Fragment } from 'react';

import PopUp from '../components/UI/PopUp/PopUp';

const withErrorHandler = (WrappedComponent, Axios) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                error: null
            }
            /* We set this interceptors inside the constructor due to componentWillMount is lecagy 
            and we need to print the error even if the BurgerBuilder component (the children wrapped) is not rendered yet */
            Axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            })
            Axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
            })
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <Fragment>
                    <PopUp
                        show={this.state.error}
                        popUpClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </PopUp>
                    <WrappedComponent {...this.props} />
                </Fragment>
            );
        }
    }
};

export default withErrorHandler;

