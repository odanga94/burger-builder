import axios from 'axios';

import actionTypes from  './actionTypes';


const authStart = () => {
    return (
        {
            type: actionTypes.AUTH_START
        }
    )
};

const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken :token,
        userId
    }
}; 

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
};

const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logOut());
        }, expirationTime * 1000)
    }
}

export const logOut = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export default {
    auth: (email, password, isSignup) => {
        return dispatch => {
            dispatch(authStart());
            const authData = {
                email,
                password,
                returnSecureToken: true
            }
            let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCl6Etvpn1s1p09d-N5qXRLoJ-AqTMUV7w'
            if (!isSignup){
                url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCl6Etvpn1s1p09d-N5qXRLoJ-AqTMUV7w'
            }
            axios.post(url ,authData)
                .then(response => {
                    console.log(response);
                    dispatch(authSuccess(response.data.idToken, response.data.localId));
                    dispatch(checkAuthTimeout(response.data.expiresIn));
                })
                .catch(err => {
                    console.log(err.response);
                    dispatch(authFail(err.response.data.error))
                })
        }
    },
}
