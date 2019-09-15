import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount(){
        axios.get('/orders.json')
            .then(res => {
                //console.log(res.data);
                const fetchedOrders = [];
                for (let key in res.data){
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                this.setState({loading: false, orders: fetchedOrders})
            }).catch(err => {
                this.setState({loading: false})
            })
    }

    render(){
        return(
            <div>
                {this.state.orders.length > 0 ? this.state.orders.map((order) => {
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

export default withErrorHandler(Orders, axios);