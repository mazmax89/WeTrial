import React, {Component} from 'react';
import './SignInStyle.scss';
import SignInForm from '../../components/SignIn/SignInForm';
import {signInAction} from '../../actions/sigInOutAction';
import {connect} from 'react-redux';
import {addFlashMessage} from '../../actions/flashMessageAction';

class SignIn extends Component {

  render() {
    return (
      <div className='intro'>
        <h1 className='heading'>WeTrial</h1>
        <div className='verticalAlignBlock'>
          <SignInForm signInAction={this.props.signInAction} addFlashMessage={this.props.addFlashMessage}/>
        </div>
      </div>
    );
  }
}

export default  connect(null, {signInAction, addFlashMessage})(SignIn);
