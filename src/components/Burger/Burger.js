import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const Burger = (props) => {

    // console.log(Object.keys(props.ingredients));
    // console.log(props.ingredients);
    // console.log(props.ingredients["meat"]);
    // console.log([...Array(props.ingredients["meat"])]); // returns an array with two fields undefined

    const transformIngredients = Object.keys(props.ingredients).map(ingType => {
        return [...Array(props.ingredients[ingType])].map((_, i) => {
            return <BurgerIngredient key={ingType + i} type={ingType} />; // key={salad1}
        });
    });

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default Burger;
