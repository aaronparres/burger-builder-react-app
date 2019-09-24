import React from 'react';

import classes from './NavigationItems.module.css';
import NavItem from './NavItem/NavItem';

const NavigationItems = () => {
    return (
        <ul className={classes.NavigationItems}>
            <NavItem link="/" active>Burger Builder</NavItem>
            <NavItem link="/">Checkout</NavItem>
        </ul>
    );
};

export default NavigationItems;