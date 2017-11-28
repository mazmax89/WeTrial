import React, {Component} from 'react';
import MenuItem from '../components/MenuItem';
import './HomeStyle.scss';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class Home extends Component {

    render() {
        const {isAuthenticated} = this.props.signIn;

        const menu = (
            isAuthenticated ? [
                <MenuItem key='posts' to='posts' name='Posts'/>,
                ]
                : [
                    <MenuItem key='menuSignUp' to='signup' name='Sign Up'/>,
                    <MenuItem key='menuSignIn' to='signin' name='Sign In'/>
                ]

        );
        return (
            <main className='homePage container-fluid'>
                <div className='menu row justify-content-center'>
                    <MenuItem to='' name='Home'/>
                    {menu}
                </div>
            </main>
        );
    }
}

Home.PropTypes = {
    signIn: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        signIn: state.signIn
    };
}

export default connect(mapStateToProps, null)(Home);

