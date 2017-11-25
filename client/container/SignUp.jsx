import React, {Component} from 'react';
import {connect} from 'react-redux';
import SignUpForm from '../components/SignUpForm';
import {userSignUpRequest} from '../actions/SignUpAction';
import {addFlashMessage} from '../actions/flashMessageAction';
import './SignUpStyle.scss';

class SignUp extends Component {
    render() {
        return (
            <div className='SignUp intro'>
                <h1 className='heading'>WeTrial</h1>
                <div className='verticalAlignBlock'>
                    <SignUpForm userSignUpRequest={this.props.userSignUpRequest}
                                addFlashMessage={this.props.addFlashMessage}/>
                </div>
            </div>
        );
    }
}

export default connect(null, {userSignUpRequest, addFlashMessage})(SignUp);
