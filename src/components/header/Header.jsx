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
			isOpen: false
		};

		this.toggle = this.toggle.bind(this);
		this.logOut = this.logOut.bind(this);
	}

	logOut() {
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
					<NavLink key='topics' to='/topic'>Topics</NavLink>,
					<NavLink key='chat' to='/chat'>Chat</NavLink>,
					<NavLink key='settings' to='/settings'>Settings</NavLink>,
					<a key='logout'
					   href='#'
					   onClick={this.logOut}>
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
							{this.props.currentUser.displayName}
							{menu}
						</Nav>
					</Collapse>
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
