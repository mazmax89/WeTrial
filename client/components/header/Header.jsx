import React, {Component} from 'react';
import NavLink from 'react-router-dom/es/NavLink';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav} from 'reactstrap';
import './HeaderStyle.scss';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {signOutAction} from '../../actions/sigInOutAction';


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

        const menu = (
            isAuthenticated ?
                [
                    <NavLink key='topics' to='/topic' >Topics</NavLink>,
                    <a key='logout'
                       href='#'
                       onClick={this.logout.bind(this)}>
                        Logout
                    </a>
                ]
                : [
                    <NavLink key='signup' to='/signup'>Sign Up</NavLink>,
                    <NavLink key='signin' to='/signin'>Sign In</NavLink>
                ]

        );

        return (
            <header>
                <Navbar expand='md' color='faded' light>
                    <NavbarBrand href='/' className='mr-auto'>WeTrial</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} className='mr-2'/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav navbar>
                            <NavLink to='/'>Home</NavLink>
                            {menu}
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
