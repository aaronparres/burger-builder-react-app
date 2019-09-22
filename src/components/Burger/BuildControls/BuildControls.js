import React from 'react';

import classes from './BuildControls.module.css';
import Controller from './Controller/Controller';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const BuildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current price: <strong>{props.price.toFixed(2)}</strong>€</p>
            {controls.map(ctrl => (
                <Controller 
                    key={ctrl.label} 
                    label={ctrl.label}
                    add={() => props.add(ctrl.type)}
                    remove={() => props.remove(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}
                />
            ))}
        </div>
    );
};

export default BuildControls;
