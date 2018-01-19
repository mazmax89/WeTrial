import React, {Component} from 'react';
import {Button, Form, FormGroup} from 'reactstrap';
import validateInput from '../../server/utils/validation/signUp';
import TextFieldGroup from './common/TextFieldGroup';
import './SignUpFormStyle.scss';
import PropTypes from 'prop-types';
import Redirect from 'react-router-dom/es/Redirect';

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
                        this.setState({isLoading: false, errors: res});
                    } else {
                        console.log('res', res);
                        this.props.addFlashMessage({
                            type: 'success',
                            text: 'You signed up successfully. Welcome!'
                        });
                        this.setState({redirect: true, isLoading: false});
                    }
                }
            );
        }
    }

    render() {
        const errors = this.state.errors;
        const redirect = (this.state.redirect ? <Redirect push to='/signin'/> : null);
        return (
            <Form onSubmit={this.onFormSubmit}>
                <div className='title'>
                    <h1>Create account</h1>
                </div>
                <FormGroup className='form-group'>
                    <TextFieldGroup
                        error={errors.errorMessage}
                        label='Email'
                        onChanged={this.onChanged}
                        field='mail'
                        type='email'
                    />
                    <TextFieldGroup
                        error={errors.password}
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
                        <button onClick={() => {
                            this.setState({redirect: true});
                        }}>Sign In
                        </button>
                    </h1>
                </div>
                {redirect}
            </Form>
        );
    }
}

SignUpForm.propTypes = {
    signUpAction: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
};
export default SignUpForm;
