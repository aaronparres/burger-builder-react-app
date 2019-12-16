import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const Burger = ( props ) => {


    const transformedIngredients = Object.keys(props.ingredients).map(ingType => {
        return [...Array(props.ingredients[ingType])].map((_, i) => {
            return <BurgerIngredient key={ingType + i} type={ingType} />; // key={salad1}
        });
    }).reduce((prev , curr) => prev.concat(curr)); //flatten the array ex. [{salad, salad}, {meat}, {cheese}] --> [salad, salad, meat, cheese]

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients.length === 0 ? <p>Start adding some ingredients</p> : transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default Burger;
