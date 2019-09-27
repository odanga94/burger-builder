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
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId')
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
                    const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                    localStorage.setItem('token', response.data.idToken);
                    localStorage.setItem('expirationDate', expirationDate);
                    localStorage.setItem('userId', response.data.localId)
                    dispatch(authSuccess(response.data.idToken, response.data.localId));
                    dispatch(checkAuthTimeout(response.data.expiresIn));
                })
                .catch(err => {
                    console.log(err.response);
                    dispatch(authFail(err.response.data.error))
                })
        }
    },
    setAuthRedirectPath: (path) => {
        return {
            type: actionTypes.SET_AUTH_REDIRECT_PATH,
            path: path
        }
    },
    authCheckState: () => {
        return dispatch => {
            const token = localStorage.getItem('token');
            //console.log(token);
            if (!token){
                dispatch(logOut());
            } else {
                const expirationDate = new Date(localStorage.getItem('expirationDate'));
                //console.log(expirationDate);
                if (expirationDate > new Date()){
                    const userId = localStorage.getItem('userId');
                    dispatch(authSuccess(token, userId));
                    dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
                } else {
                    dispatch(logOut());
                }
            }
        }
    }
}
