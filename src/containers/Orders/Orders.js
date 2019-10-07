import React, { Component } from 'react';
import { connect } from 'react-redux'

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import orderActionCreators from '../../store/actions/order';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    
    componentDidMount(){
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render(){
        return(
            <div>
                {this.props.loading ? <Spinner/> : this.props.orders.length > 0 ? this.props.orders.map((order) => {
                    return(
                        <Order 
                            key={order.id}
                            ingredients={order.ingredients}
                            price={order.price}
                        />
                    );
                }) : <p>You have not placed any orders yet!</p>}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(orderActionCreators.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));