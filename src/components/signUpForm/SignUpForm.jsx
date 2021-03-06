import React, {Component} from 'react';
import {Button, Form, FormGroup} from 'reactstrap';
import validateInput from '../../utils/validation/signUp';
import TextFieldGroup from '../common/TextFieldGroup';
import './SignUpFormStyle.scss';
import PropTypes from 'prop-types';
import Redirect from 'react-router-dom/es/Redirect';
import Link from 'react-router-dom/es/Link';
import {Loader} from 'react-loaders';

class SignUpForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			mail: '',
			firstPassword: '',
			confirmPassword: '',
			errors: {},
			isLoading: false,
			redirect: false
		};
		this.onChanged = this.onChanged.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	onChanged(e) {
		let stateName = e.target.name;
		if (stateName === 'mail') {
			this.setState({mail: e.target.value});
		} else if (stateName === 'password') {
			this.setState({firstPassword: e.target.value});
		} else {
			this.setState({confirmPassword: e.target.value});
		}
	}

	isValid() {
		const {errors, isValid} = validateInput(this.state);
		if (!isValid) {
			this.setState({errors});
		}

		return isValid;
	}

	onFormSubmit(e) {
		e.preventDefault();

		if (this.isValid()) {
			this.setState({errors: {}, isLoading: true});
			const email = this.state.mail;
			const password = this.state.firstPassword;
			this.props.signUpAction({email, password}).then(
				(res) => {
					if (res.errorMessage) {
						this.props.addFlashMessage({
							type: 'danger',
							text: res.errorMessage
						});
						this.setState({isLoading: false});
					} else {
						this.props.setCurrentUser(res);
						this.props.pushUserToDatabase(res);
						this.props.addFlashMessage({
							type: 'success',
							text: 'You signed up successfully! Now you can sign in'
						});
						this.setState({redirect: true, isLoading: false});
					}
				}
			);
		}
	}

	render() {
		const errors = this.state.errors;
		const redirect = (this.state.redirect ? <Redirect push to='/'/> : null);
		if (this.state.isLoading) return (
				<Loader type='line-scale' color={'#36b5e0'} active/>
		);
		return (
			<Form onSubmit={this.onFormSubmit}>
				<div className='title'>
					<h1>Create account</h1>
				</div>
				<FormGroup className='form-group'>
					<TextFieldGroup
						error={errors.mail}
						label='Email'
						onChanged={this.onChanged}
						field='mail'
						type='email'
					/>
					<TextFieldGroup
						error={errors.firstPassword}
						label='password'
						onChanged={this.onChanged}
						field='password'
						type='password'
					/>
					<TextFieldGroup
						error={errors.confirmPassword}
						label='confirm Password'
						onChanged={this.onChanged}
						field='confirmPassword'
						type='password'
					/>
					<Button disabled={this.state.isLoading} className='btnDefault' type='submit'>
						Sign Up
					</Button>
				</FormGroup>
				<div className='title'>
					<h1>Or
						<Link to='/signin'> Sign In</Link>
					</h1>
				</div>
				{redirect}
			</Form>
		);
	}
}

SignUpForm.propTypes = {
	signUpAction: PropTypes.func.isRequired,
	setCurrentUser: PropTypes.func.isRequired,
	addFlashMessage: PropTypes.func.isRequired,
	pushUserToDatabase: PropTypes.func.isRequired
};
export default SignUpForm;
