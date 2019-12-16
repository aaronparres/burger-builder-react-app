import React from 'react';

import classes from './NavigationItems.module.css';
import NavItem from './NavItem/NavItem';

const NavigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavItem link="/" exact>Burger Builder</NavItem>
            {props.isAuthenticated ? <NavItem link="/orders">Orders</NavItem> : null}
            {!props.isAuthenticated ? <NavItem link="/login">Login</NavItem> : <NavItem link="/logout">Logout</NavItem>}
        </ul>
    );
};

export default NavigationItems;