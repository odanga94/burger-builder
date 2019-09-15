import React from 'react';

import styles from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    let validationError = null;
    const inputClasses = [styles.InputElement];

    if (props.invalid && props.touched){
        inputClasses.push(styles.Invalid);
        switch (props.name) {
            case('name'):
                validationError = <p>Please enter your name</p>;
                break;
            case('street'):
                validationError = <p>Please enter your street address</p>;
                break;
            case('zipCode'):
                validationError = <p>Please enter a valid zip code</p>;
                break;
            case('county'):
                validationError = <p>Please enter your county</p>;
                break;
            case('email'):
                validationError = <p>Please enter a valid email</p>;
                break;
            case('deliveryMethod'):
                validationError = <p>Please select your preferred delivery method</p>;
                break;
            default:
                validationError = null; 
        }
        
    }
    switch (props.elementType){
        case ('input'):
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
            break;
        case ('textarea'):
            inputElement = <textarea className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>
            break;
        case ('select'):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                >
                    {props.elementConfig.options.map(option => (
                        <option value={option.value} key={option.value} onChange={props.changed}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>
    }
    return(
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    )
}

export default input;