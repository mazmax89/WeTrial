import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {resetPasswordEmail} from '../../actions/userActions';
import {addFlashMessage} from '../../actions/flashMessageAction';
import PropTypes from 'prop-types';
import Redirect from 'react-router-dom/es/Redirect';

class ResetPasswordForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			errors: {},
			redirect: false,
			isLoading: false,
		};
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	onFormSubmit(event) {
		event.preventDefault();
		this.setState({errors: {}, isLoading: true});
		const email = this.refs.email.value;
		this.props.resetPasswordEmail(email).then(
			(res) => {
				if (res.errorMessage) {
					this.setState({errors: res.errorMessage, isLoading: false});
					this.props.addFlashMessage({
						type: 'danger',
						text: res.errorMessage,
					});
				} else {
					this.props.addFlashMessage({
						type: 'success',
						text: 'Check your email'
					});
					this.setState({redirect: true, isLoading: false});
				}

			},
		);
	}

	render() {
		const redirect = (this.state.redirect ? <Redirect push to='/signin'/> : null);
		return (
			<div className='col-md-4'>
				<form role='form' onSubmit={this.onFormSubmit}>
					<div className='form-group'>
						<label htmlFor='txtEmail'>Email address</label>
						<input
							type='email' className='form-control' id='txtEmail' ref='email' placeholder='Enter email'
							name='email'
						/>
					</div>
					<button type='submit' className='btn btn-default btn-block'>Reset Password</button>
				</form>
				{redirect}
			</div>
		);
	}
}

ResetPasswordForm.propTypes = {
	resetPasswordEmail: PropTypes.func.isRequired,
	addFlashMessage: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		resetPasswordEmail,
		addFlashMessage,
	}, dispatch);
}

export default connect(null, mapDispatchToProps)(ResetPasswordForm);
