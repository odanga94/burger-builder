import reducer from './auth';
import actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(
            {
                token: null,
                userId: null,
                error: null,
                loading: false,
                authRedirectPath: '/'
            }
        );
    });

    it('should store the token upon login', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }, 
        {
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'some_token',
            userId: 'some_userId'
        })).toEqual({
            token: 'some_token',
            userId: 'some_userId',
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    })
})