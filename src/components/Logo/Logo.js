import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import styles from './Logo.module.css';

const logo = (props) => {
    return (
        <div className={styles.Logo} style={{height: props.height}}>
            <img src={burgerLogo} alt="MyBurgerLogo" />
        </div>
    );
}

export default logo;