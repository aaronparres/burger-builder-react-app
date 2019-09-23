import React, { Fragment } from 'react';

import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const Layout = ( props ) => (
    <Fragment>
        <Toolbar />
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={classes.Content}>
            {props.children} {/* props.children --> <BurgerBuilder /> */}
        </main>
    </Fragment>
);
export default Layout;