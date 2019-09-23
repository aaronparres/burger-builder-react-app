import React, { Fragment } from 'react';

import classes from './PopUp.module.css';
import Backdrop from '../Backdrop/Backdrop';

const PopUp = (props) => {
    return (
        <Fragment>
            <Backdrop show={props.show} clicked={props.popUpClosed} />
            <div
                className={classes.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                {props.children} {/* --> <OrderSummary />*/}
            </div>
        </Fragment>
    );
};

export default PopUp;