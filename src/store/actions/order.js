import actionTypes from './actionTypes';
import axios from '../../axios-orders';


export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}
export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export default {
    purchaseBurger: (orderData, token) => {
        return dispatch => {
            dispatch(purchaseBurgerStart());
            axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                console.log(response);
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            })
            .catch(error => {
                console.log(error)
                dispatch(purchaseBurgerFail(error));
            });
        }
    },
    purhaseInit: () => {
        return {
            type: actionTypes.PURCHASE_INIT
        }
    },
    fetchOrders: (token) => {
        return dispatch => {
            dispatch(fetchOrdersStart())
            axios.get('/orders.json?auth=' + token)
            .then(res => {
                //console.log(res.data);
                const fetchedOrders = [];
                for (let key in res.data){
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            }).catch(err => {
                dispatch(fetchOrdersFailed(err))
            })
        }
    }
}