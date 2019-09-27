import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import burgerActionCreators from '../../store/actions/burgerBuilder';
import orderActionCreators from '../../store/actions/order'



class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }

    componentDidMount(){
        console.log(this.props);
        this.props.onInitIngredients();
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            }).reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0
    }


    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        //alert('You continue!!');
        
        /*const queryParams = [];
        for (let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');*/
        this.props.onInitPurchase();
        this.props.history.push('/checkout');

    }

    render(){
        const disabledInfo = {...this.props.ings};
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        // {salad: true, meat: false, ...}
        let orderSummary = this.props.ings ?  <OrderSummary 
            ingredients={this.props.ings} 
            price={this.props.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} /> : null
        
        let burger = this.props.error ? <p> Sorry Ingredients can't be loaded at this time :(</p> : this.props.ings ? (
            <Aux>
                <Burger ingredients={this.props.ings} />
                <BuildControls 
                    ingredientAdded={this.props.onIngredientAdded} 
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    price={this.props.totalPrice}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchaseHandler}
                />
            </Aux>
        ) : <Spinner/>

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerActionCreators.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerActionCreators.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerActionCreators.initIngredients()),
        onInitPurchase: () => dispatch(orderActionCreators.purhaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));