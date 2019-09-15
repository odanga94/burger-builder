import React from 'react';
import styles from './Order.module.css';

const order = (props) => {
    const ingredients = [];
    for (let ingredientName in props.ingredients){
        ingredients.push({
            name: ingredientName, 
            amount: props.ingredients[ingredientName]
        });
    }
    const ingredientOutput = ingredients.map(ig => {
        return <span 
                    key={ig.name}
                    style={{
                        textTransform: 'capitalize',
                        display: 'inline-block',
                        margin: '0 8px',
                        border: '1px solid #ccc',
                        padding: '5px'
                    }}
                >{ig.name} ({ig.amount})</span>
    })
    return(
        <div className={styles.Order}>
            Ingredients: {ingredientOutput}
            <p>Price: <strong>Ksh. {props.price}</strong></p>
        </div>
    );
}

export default order;