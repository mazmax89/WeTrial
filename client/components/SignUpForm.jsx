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
            username: '',
            firstPassword: '',
            confirmPassword: '',
            errors: {},
            isLoading: false,
            redirect: false
        };
        this.onChanged = this.onChanged.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChanged(e) {
        let stateName = e.target.name;
        if (stateName === 'username') {
            this.setState({username: e.target.value});
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

    onSubmit(e) {
        e.preventDefault();

        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true});
            this.props.userSignUpRequest(this.state).then(
                () => {
                    this.props.addFlashMessage({
                        type: 'success',
                        text: 'You signed up successfully. Welcome!'
                    });
                    this.setState({redirect: true});
                }, (data) => {
                    this.setState({errors: data.response.data, isLoading: false});
                }
            );
        }

    }

    render() {
        const errors = this.state.errors;
        const redirect = (this.state.redirect? <Redirect push to='/signin'/> : null);
        return (
            <Form onSubmit={this.onSubmit}>
                <div className='title'>
                    <h1>Create account</h1>
                </div>
                <FormGroup className='form-group'>
                    <TextFieldGroup
                        error={errors.username}
                        label='Username'
                        onChanged={this.onChanged}
                        field='username'
                        type='text'
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
                        SIGNUP
                    </Button>
                </FormGroup>
                <div className='title'>
                    <h1>Or <button onClick={() => {this.setState({redirect: true});}}>sign in</button></h1>
                </div>
                {redirect}
            </Form>
        );
    }
}

SignUpForm.propTypes = {
    userSignUpRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
};
export default SignUpForm;
