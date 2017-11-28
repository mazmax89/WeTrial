import React, {Component} from 'react';
import {Button, Form, FormGroup} from 'reactstrap';
import TextFieldGroup from '../common/TextFieldGroup';
import validateInput from '../../../server/utils/validation/SignIn';
import './SigInFormStyle.scss';
import PropTypes from 'prop-types';
import Redirect from 'react-router-dom/es/Redirect';

class SignInForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      password: '',
      errors: {},
      isLoading: false,
      form: null,
      redirect: false,
    };
    this.onChanged = this.onChanged.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChanged(e) {
    let stateName = e.target.name;
    if (stateName === 'identifier') {
      this.setState({identifier: e.target.value});
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

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({errors: {}, isLoading: true});
      this.props.signInAction(this.state).then(
        (res) => { // eslint-disable-line
          this.props.addFlashMessage({
            type: 'success',
            text: 'You signed in successfully. Welcome!'
          });
          this.setState({redirect: true});
        },
        (data) => {
          this.setState({errors: data.response.data, isLoading: false});
        },
      );
    }
  }

  render() {
    const errors = this.state.errors;
    const redirect = (this.state.redirect? <Redirect push to='/'/> : null);
    return (
      <Form onSubmit={this.onSubmit}>
        <div className='title'>
          <h1>Sign in</h1>
        </div>
        <div className='warning'>{errors.errors ? errors.errors.form : null}</div>
        <FormGroup className='formGroup'>
          <TextFieldGroup
            error={errors.identifier}
            label='Username'
            onChanged={this.onChanged}
            field='identifier'
            type='text'
          />
          <TextFieldGroup
            error={errors.password}
            label='Password'
            onChanged={this.onChanged}
            field='password'
            type='password'
          />
          <Button disabled={this.state.isLoading} className='btnDefault' type='submit'>
            Sign In
          </Button>
        </FormGroup>
        {redirect}
      </Form>
    );
  }
}

SignInForm.propTypes = {
  signInAction: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
};


export default SignInForm;
