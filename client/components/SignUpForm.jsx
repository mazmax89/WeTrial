import React, {Component} from 'react';
import {Button, Form, FormGroup} from 'reactstrap';
import validateInput from '../../server/utils/validation/SignUp';
import TextFieldGroup from './common/TextFieldGroup';

class SignUpForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            firstPassword: '',
            confirmPassword: '',
            errors: {},
            isLoading: false,
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
            this.props.userSignupRequest(this.state).then(
                () => {
                    setInterval(window.location.reload(), 10000);
                }, (data) => {
                    this.setState({errors: data.response.data, isLoading: false});
                },
            );
        }

    }

    render() {
        const errors = this.state.errors;
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
                    <Button disabled={this.state.isLoading} className='btn' type='submit'>
                        SIGNUP
                    </Button>
                </FormGroup>
                <div className='title'>
                    <h1>Or <a href='/signin'>login</a></h1>
                </div>
            </Form>
        );
    }
}

export default SignUpForm;
