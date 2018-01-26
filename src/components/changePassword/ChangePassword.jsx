import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changePassword} from '../../actions/userActions';
import PropTypes from 'prop-types';
import {addFlashMessage} from '../../actions/flashMessageAction';

class ChangePassword extends Component {

	constructor(props) {
		super(props);
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.state = {
			errors: {},
			redirect: false,
			isLoading: false,
		};
	}

	onFormSubmit(event) {
		event.preventDefault();
		this.setState({errors: {}, isLoading: true});
		let password = this.refs.password.value;
		let repeatPassword = this.refs.repeatPassword.value;
		if (password !== repeatPassword) {
			this.props.addFlashMessage({
				type: 'danger',
				text: 'Password must match!',
			});
		} else {
			this.props.changePassword(password).then(
				(res) => {
					if (res) {
						this.props.addFlashMessage({
							type: 'danger',
							text: res.errorMessage,
						});
						this.setState({errors: res.errorMessage, isLoading: false});
					} else {
						this.props.addFlashMessage({
							type: 'success',
							text: 'Password changed!'
						});
					}
					this.setState({isLoading: false});
				});
		}
	}

	render() {
		return (
			<form id='ChangePassword' role='form' onSubmit={this.onFormSubmit}>
				<h4> Change Password </h4>
				<div className='form-group'>
					<label htmlFor='password'> New Password: </label>
					<input type='password' className='form-control' name='password' ref='password' id='password'
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='repeatPassword'> Repeat Password: </label>
					<input type='password' className='form-control'
						   name='repeatPassword' ref='repeatPassword' id='repeatPassword'/>
				</div>
				<button type='submit' className='btn btn-primary'>Change Password</button>
			</form>
		);
	}
}

ChangePassword.propTypes = {
	changePassword: PropTypes.func.isRequired,
	addFlashMessage: PropTypes.func.isRequired,
	currentUser: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({changePassword, addFlashMessage}, dispatch);
}

function mapStateToProps(state) {
	return {currentUser: state.currentUser};
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
