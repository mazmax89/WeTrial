import './SignUpStyle.scss';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import SignUpForm from '../../components/signUpForm/SignUpForm';
import {addFlashMessage} from '../../actions/flashMessageAction';
import {pushUserToDatabase, setCurrentUser, signUpAction} from '../../actions/userActions';
import bindActionCreators from 'redux/es/bindActionCreators';

class SignUp extends Component {
	render() {
		return (
			<div className='SignUp intro'>
				<h1 className='heading'>WeTrial</h1>
				<div className='verticalAlignBlock'>
					<SignUpForm signUpAction={this.props.signUpAction}
								addFlashMessage={this.props.addFlashMessage}
								setCurrentUser={this.props.setCurrentUser}
								pushUserToDatabase={this.props.pushUserToDatabase}/>
				</div>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		signUpAction,
		setCurrentUser,
		pushUserToDatabase,
		addFlashMessage,
	}, dispatch);
}

export default connect(null, mapDispatchToProps)(SignUp);
