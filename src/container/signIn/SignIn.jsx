import React, {Component} from 'react';
import './SignInStyle.scss';
import SignInForm from '../../components/signInForm/SignInForm';
import {signInAction, signInWithProviderAction} from '../../actions/userActions';
import {connect} from 'react-redux';
import {addFlashMessage} from '../../actions/flashMessageAction';
import {Loader} from 'react-loaders';
import Redirect from 'react-router-dom/es/Redirect';

class SignIn extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			redirect: false
		};
		this.onLoading = this.onLoading.bind(this);
	}

	onLoading(loading, redirect) {
		this.setState({isLoading: loading, redirect: redirect});
	}

	render() {
		let style = {
			display: 'none',
		};
		if (this.state.isLoading) return (
			<div>
				<Loader type='line-scale' color={'#36b5e0'} active/>
				<div className='intro' style={style}>
					<SignInForm
						onLoading={this.onLoading.bind(this)}
						signInAction={this.props.signInAction}
						signInWithProviderAction={this.props.signInWithProviderAction}
						addFlashMessage={this.props.addFlashMessage}/>
				</div>
			</div>
		);
		if (this.state.redirect === true) return (<Redirect push to='/'/>);
		return (
			<div className='intro'>
				<h1 className='heading'>WeTrial</h1>
				<div className='verticalAlignBlock'>
					<SignInForm onLoading={this.onLoading.bind(this)}
								signInAction={this.props.signInAction}
								signInWithProviderAction={this.props.signInWithProviderAction}
								addFlashMessage={this.props.addFlashMessage}/>
				</div>
			</div>
		);
	}
}

export default connect(null, {signInAction, signInWithProviderAction, addFlashMessage})(SignIn);
