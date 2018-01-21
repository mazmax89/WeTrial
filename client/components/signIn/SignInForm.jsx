import React, {Component} from 'react';
import {Button, Form, FormGroup} from 'reactstrap';
import TextFieldGroup from '../common/TextFieldGroup';
import validateInput from '../../../server/utils/validation/SignIn';
import './SigInFormStyle.scss';
import PropTypes from 'prop-types';
import Redirect from 'react-router-dom/es/Redirect';
import {NavLink} from 'react-router-dom';

class SignInForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			mail: '',
			password: '',
			errors: {},
			isLoading: false,
			redirect: false
		};
		this.onChanged = this.onChanged.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.signInWithProvider = this.signInWithProvider.bind(this);
	}

	onChanged(e) {
		let stateName = e.target.name;
		if (stateName === 'mail') {
			this.setState({mail: e.target.value});
		} else {
			this.setState({password: e.target.value});
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
			const password = this.state.password;
			this.props.signInAction({email, password}).then(
				(res) => { // eslint-disable-line
					this.props.addFlashMessage({
						type: 'success',
						text: 'You signed in successfully. Welcome!'
					});
					this.setState({redirect: true, isLoading: false});
				},
				(data) => {
					this.setState({errors: data.message, isLoading: false});
				}
			);
		}
	}

	signInWithProvider() {
		let provider = 'google';
		this.props.signInWithProviderAction(provider).then(
			(res) => { // eslint-disable-line
				this.props.addFlashMessage({
					type: 'success',
					text: 'You signed in successfully. Welcome!'
				});
				this.setState({redirect: true});
			},
			(data) => {
				console.log(data);
				this.setState({errors: data.message, isLoading: false});
			});
	}

	render() {
		const errors = this.state.errors;
		const redirect = (this.state.redirect ? <Redirect push to='/'/> : null);
		return (
			<div>
				<Form onSubmit={this.onFormSubmit}>
					<div className='title'>
						<h1>Sign in</h1>
					</div>
					<div className='warning'>{errors.errors ? errors.errors.form : null}</div>
					<FormGroup className='formGroup'>
						<TextFieldGroup
							error={errors.mail}
							label='Email'
							onChanged={this.onChanged}
							field='mail'
							type='email'
						/>
						<TextFieldGroup
							error={errors.password}
							label='Password'
							onChanged={this.onChanged}
							field='password'
							type='password'
						/>
						<Button className='btnDefault' type='submit'>
							Sign In
						</Button>
					</FormGroup>
					<h5><NavLink to='/reset'>Forgot password?</NavLink></h5>
					<h4>Login with</h4>
				</Form>

				<button
					className='btn btn-block btn-social btn-google'
					onClick={this.signInWithProvider}>Google
				</button>
				{redirect}
			</div>
		);
	}
}

SignInForm.propTypes = {
	signInAction: PropTypes.func.isRequired,
	addFlashMessage: PropTypes.func.isRequired,
	signInWithProviderAction: PropTypes.func.isRequired
};


export default SignInForm;
