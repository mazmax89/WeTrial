import React, {Component} from 'react';
import {Button, Form, FormGroup} from 'reactstrap';
import validateInput from '../../../server/utils/validations/Signup';
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

    private onChanged(e) {
        let stateName = e.target.name;
        if (stateName === 'username') {
            this.setState({username: e.target.value});
        } else if (stateName === 'password') {
            this.setState({firstPassword: e.target.value});
        } else {
            this.setState({confirmPassword: e.target.value});
        }
    }

    private isValid() {
        const {errors, isValid} = validateInput(this.state);

        if (!isValid) {
            this.setState({errors});
        }

        return isValid;
    }

    private onSubmit(e) {
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

    public render() {
        const errors = this.state.errors;
        return (
            <Form horizontal onSubmit={this.onSubmit}>
                <div className={style.title}>
                    <h1>Create account</h1>
                </div>
                <FormGroup className={style.formGroup} controlId='formHorizontalEmail'>
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
                    <Button disabled={this.state.isLoading} className={style.btnDefault} type='submit'>
                        SIGNUP
                    </Button>
                </FormGroup>
                <div className={style.title}>
                    <h1>Or <a href='/login'>login</a></h1>
                </div>
            </Form>
        );
    }
}

export default SignupForm;
