import actionTypes from './actionTypes';

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
    }
}