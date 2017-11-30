import React, {Component} from 'react';
import './CreateTopicStyle.scss';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Alert, Button, Form, FormGroup, ModalFooter} from 'reactstrap';
import TextFieldGroup from '../common/TextFieldGroup';
import validateInput from '../../../server/utils/validation/createTopic';

class CreateTopic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            topicName: '',
            topicText: '',
            errors: {},
            isLoading: false
        };
        this.onChanged = this.onChanged.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChanged(e) {
        let stateName = e.target.name;
        if (stateName === 'topicName') {
            this.setState({topicName: e.target.value});
        } else {
            this.setState({topicText: e.target.value});
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
            this.props.createTopicAction(this.state, this.props.signIn).then(
                () => {
                    this.props.addFlashMessage({
                        type: 'success',
                        text: 'Topic created!'
                    });
                    this.setState({redirect: true});
                }, (data) => {
                    this.setState({errors: data.response.data, isLoading: false});
                }
            );
        }
    }

    render() {
        const {isAuthenticated} = this.props.signIn;
        const errors = this.state.errors;
        if (isAuthenticated) {
            return (
                <div className='createTopic'>
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup className='form-group'>
                            <TextFieldGroup
                                error={errors.topicName}
                                label='Enter topic name'
                                onChanged={this.onChanged}
                                field='topicName'
                                type='text'
                            />
                            <textarea name='topicText' onChange={this.onChanged} placeholder='Topic text'
                                      maxLength={255}/>
                            {errors && <span className='warning'>{errors.topicText}</span>}

                            <ModalFooter>
                                <Button disabled={this.state.isLoading} color='primary' type='submit'>
                                    Post topic
                                </Button>
                            </ModalFooter>
                        </FormGroup>
                    </Form>
                </div>
            );
        } else {
            return (
                <Alert color='danger' className='row justify-content-center'>
                    <span>You don't have permissions to see this</span>
                </Alert>
            );
        }
    }
}

CreateTopic.PropTypes = {
    signIn: PropTypes.object.isRequired,
    userSignUpRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        signIn: state.signIn
    };
}

export default connect(mapStateToProps, null)(CreateTopic);

