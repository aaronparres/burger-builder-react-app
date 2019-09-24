import React, { Component, Fragment } from 'react';

import PopUp from '../components/UI/PopUp/PopUp';

const withErrorHandler = (WrappedComponent, Axios) => {
    return class extends Component {

        state = {
            error: null
        }

        componentDidMount() {
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

