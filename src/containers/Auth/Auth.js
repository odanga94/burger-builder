import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import actionCreators from '../../store/actions/auth';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import styles from './Auth.module.css';
import Aux from '../../hoc/Aux';
import { checkValidity } from '../../shared/utility';


class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignUp: true
    }

    componentDidMount(){
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath()
        }
    }


    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({controls: updatedControls});
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp}
        })
    }
 
    render(){
        const formElementsArray = [];
        for (let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementsArray.map((formElement) => (
            <Input
                key={formElement.id}
                name={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
        ))

        let errorMessage = null;

        if (this.props.error){
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }

        let authRedirect = null;
        if (this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return (
           <div className={styles.Auth}>
               {authRedirect}
              <h2>{this.state.isSignUp ? 'SIGN UP' : 'SIGN IN'}</h2>
              {errorMessage}
              { this.props.loading ? <Spinner/> : 
                <Aux>
                    <form onSubmit={this.onSubmitHandler}>
                        {form}
                        <Button btnType="Success">{this.state.isSignUp ? 'SIGN UP' : 'SIGN IN'}</Button>
                    </form>
                    <Button 
                            clicked={this.switchAuthModeHandler}
                            btnType="Danger"
                    >
                        SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}
                    </Button>
                </Aux>
              }
          </div>  
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actionCreators.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actionCreators.setAuthRedirectPath('/'))
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);