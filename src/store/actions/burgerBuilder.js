import actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const setIngredients = ingredients => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export default {
    addIngredient: (ingName) => {
        return {
            type: actionTypes.ADD_INGREDIENT, 
            ingredientName: ingName
        }
    },
    removeIngredient: (ingName) => {
        return {
            type: actionTypes.REMOVE_INGREDIENT,
            ingredientName: ingName
        }
    },
    initIngredients: () => {
        return  dispatch => {
            axios.get('ingredients.json')
            .then(response => {
                //console.log(response);
                dispatch(setIngredients(response.data))
               
            }).catch(error => {
                dispatch(fetchIngredientsFailed())
            })
        };
    }
}