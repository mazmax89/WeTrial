import React, {Component} from 'react';
import NavLink from 'react-router-dom/es/NavLink';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav} from 'reactstrap';
import './HeaderStyle.scss';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {signOutAction} from '../actions/sigInOutAction';


class Header extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    logout(e) {
        e.preventDefault();
        this.props.signOutAction();
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const {isAuthenticated} = this.props.signIn;

        const signOut = (
            isAuthenticated ? <a className='link'
                                 href='#'
                                 onClick={this.logout.bind(this)}>
                Logout
            </a> : null
        );

        return (
            <header>
                <Navbar expand='md'>
                    <NavbarBrand href='/'>Trial</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav navbar>
                            <NavLink to='/' exact activeClassName='active'>Home</NavLink>
                            <NavLink to='/signup' exact activeClassName='active'>Sign Up</NavLink>
                            <NavLink to='/signin' exact activeClassName='active'>Sign In</NavLink>
                            {signOut}
                        </Nav>
                    </Collapse>
                </Navbar>
            </header>
        );
    }
}

Header.PropTypes = {
    signIn: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        signIn: state.signIn
    };
}

export default connect(mapStateToProps, {signOutAction})(Header);
