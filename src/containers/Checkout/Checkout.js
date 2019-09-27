import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

import ContactData from '../ContactData/ContactData';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import Aux from '../../hoc/Aux';


class Checkout extends Component{
    
    /*componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let totalPrice = 0;
        for (let param of query.entries()){
            console.log('param', param);
            // ['salad', '1']
            if (param[0] === 'price'){
                totalPrice = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
            
        }
        this.setState({ingredients, totalPrice});
    }*/

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        let summary = <Redirect to="/"/>
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/orders"/> : null;
            summary = (
                <Aux>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        ingredients={this.props.ings} 
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}
                    />
                    <Route
                        path={this.props.match.path + '/contact-data'} 
                        component={ContactData} 

                    />
                </Aux>
            )
        }
        return(
            summary
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}


export default connect(mapStateToProps)(Checkout);