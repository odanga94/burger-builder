import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './SideDrawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

const sideDrawer = (props) => {
    //console.log(props.open);
    let attachedStyles = [styles.SideDrawer, styles.Close];
    if (props.open){
        attachedStyles = [styles.SideDrawer, styles.Open];
    }
    //console.log(attachedStyles.join(' '));
    return(
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedStyles.join(' ')}>
                <Logo height="10%"  />
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth} />
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer;