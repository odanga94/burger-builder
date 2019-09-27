import React from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends React.Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return (
                { showSideDrawer: !prevState.showSideDrawer }
            );
        });  
    }

    render(){
        return (
            <Aux>
                <Toolbar 
                    drawerToggleClicked={this.sideDrawerToggleHandler}
                    isAuth={this.props.isAuthenticated}
                />
                <SideDrawer 
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} 
                    isAuth={this.props.isAuthenticated}
                />
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
    
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);