import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { logOut } from '../../../store/actions/auth';

class Logout extends Component {
    componentDidMount(){
        this.props.onLogout();
    }

    render() {
        return (
            <Redirect to="/"/>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(logOut())
    }
}

export default connect(null, mapDispatchToProps)(Logout);