import React, {Component} from 'react';
import NavLink from 'react-router-dom/es/NavLink';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav} from 'reactstrap';
import './HeaderStyle.scss';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import bindActionCreators from 'redux/es/bindActionCreators';
import {signOutAction} from '../../actions/userActions';
import {addFlashMessage} from '../../actions/flashMessageAction';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };
        this.toggle = this.toggle.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    signOut() {
        this.props.signOutAction().then(
            (res) => { //eslint-disable-line
                this.props.addFlashMessage({
                    type: 'success',
                    text: 'You signed out!'
                });
            },
            (data) => {
                console.log(data);
            }
        );
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const {isAuthenticated} = this.props.currentUser;
        const menu = (
                isAuthenticated ?
                    [
                        <Collapse key='menu' className='row' isOpen={this.state.isOpen} navbar>
                            <Nav className='col-md-5' navbar>
                                <NavLink to='/'>Home</NavLink>
                                <NavLink to='/topic'>Topics</NavLink>
                                <NavLink to='/chat'>Chat</NavLink>

                            </Nav>
                            <div className='dropdown userMenu col-1 offset-md-6'>
                                <a className='dropdown-toggle' href='#' role='button'
                                   id='dropdownMenuLink' data-toggle='dropdown' aria-haspopup='true'
                                   aria-expanded='false'>
                                    <img src={this.props.currentUser.user.photoURL} alt='user'/>

                                </a>
                                <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
                                    <NavLink className='dropdown-item' to='/settings'>Settings</NavLink>
                                    <NavLink className='dropdown-item'
                                             to='/signin'
                                             onClick={this.signOut}>
                                        Logout
                                    </NavLink>
                                </div>
                            </div>
                        </Collapse>

                    ]
                    :
                    [
                        <Collapse key='menu' className='row' isOpen={this.state.isOpen} navbar>
                            <Nav className='col-md-5' navbar>
                                <NavLink to='/signup'>Sign Up</NavLink>
                                <NavLink to='/signin'>Sign In</NavLink>
                            </Nav>
                        </Collapse>
                    ]
            )
        ;
        return (
            <header>
                <Navbar expand='md' color='faded' light>
                    <NavbarBrand href='/'>WeTrial</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} className='mr-2'/>
                    {menu}
                </Navbar>
            </header>
        );
    }
}

Header.propTypes = {
    currentUser: PropTypes.object.isRequired,
    signOutAction: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({signOutAction, addFlashMessage}, dispatch);
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
