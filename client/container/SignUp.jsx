import React, {Component} from 'react';
import {connect} from 'react-redux';
import SignUpForm from '../components/SignUpForm';
import {userSignUpRequest} from '../actions/SignUpAction';
import {addFlashMessage} from '../actions/flashMessageAction';

class SignUp extends Component {
    render() {
        return (
            <div className='SignUp container-fluid'>
                <h1>Sign UP!!!</h1>
                <SignUpForm userSignupRequest={this.props.userSignupRequest} addFlashMessage={this.props.addFlashMessage}/>
            </div>
        );
    }
}
export default connect(null, {userSignUpRequest, addFlashMessage})(SignUp);
