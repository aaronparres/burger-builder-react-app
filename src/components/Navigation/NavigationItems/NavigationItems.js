import React from 'react';

import classes from './NavigationItems.module.css';
import NavItem from './NavItem/NavItem';

const NavigationItems = () => {
    return (
        <ul className={classes.NavigationItems}>
            <NavItem link="/" exact>Burger Builder</NavItem>
            <NavItem link="/orders">Orders</NavItem>
            <NavItem link="/login">Login</NavItem>
        </ul>
    );
};

export default NavigationItems;