import React, {Component} from 'react';
import './CreateTopicStyle.scss';
import PropTypes from 'prop-types';
import {
	Alert, Button, Card, CardBody, CardTitle, Form, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader, Input
} from 'reactstrap';
import TextFieldGroup from '../common/TextFieldGroup';
import Redirect from 'react-router-dom/es/Redirect';
import validateInput from '../../utils/validation/topics';

export default class CreateTopic extends Component {

	constructor(props) {
		super(props);
		this.state = {
			topicCategory: 'main',
			topicName: '',
			topicText: '',
			errors: {},
			isLoading: false,
			modal: false
		};
		this.onChanged = this.onChanged.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.toggle = this.toggle.bind(this);
	}

	toggle() {
		this.setState({
			modal: !this.state.modal
		});
	}

	onChanged(e) {
		let stateName = e.target.name;
		if (stateName === 'topicName') {
			this.setState({topicName: e.target.value});
		} else if (stateName === 'topicText'){
			this.setState({topicText: e.target.value});
		} else {
			this.setState({topicCategory: e.target.value});
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
			this.props.createTopicAction(this.state, this.props.currentUser.user).then(
				() => {
					this.props.addFlashMessage({
						type: 'success',
						text: 'Topic created!'
					});
					this.setState({modal: false});
				}, (data) => {
					this.setState({errors: data.response.data, isLoading: false});
				}
			);
		}
	}

	render() {
		const {isAuthenticated} = this.props.currentUser;
		const errors = this.state.errors;
		if (isAuthenticated) {
			return (
				<Card>
					<CardBody>
						<CardTitle>Create new topic</CardTitle>
						<Button color='primary' onClick={this.toggle}>Create</Button>
						<Modal isOpen={this.state.modal} toggle={this.toggle} className='modalCreateTopic'>
							<ModalHeader toggle={this.toggle}>Create topic</ModalHeader>
							<ModalBody>
								<div className='createTopic'>
									<Form onSubmit={this.onSubmit}>
										<FormGroup className='form-group'>
											<Input type='select' name='topicCategory' id='exampleSelect' onChange={this.onChanged}>
												<option>Main</option>
												<option>Components</option>
												<option>Videos</option>
												<option>News</option>
												<option>Caps</option>
											</Input>
											<TextFieldGroup
												error={errors.topicName}
												label='Enter topic name'
												onChanged={this.onChanged}
												field='topicName'
												type='text'
											/>
											<textarea name='topicText' onChange={this.onChanged}
													  placeholder='Topic text'
													  maxLength={65530}/>
											{errors && <span className='warning'>{errors.topicText}</span>}

											<ModalFooter>
												<Button disabled={this.state.isLoading} color='primary' type='submit'>
													Post topic
												</Button>
											</ModalFooter>
										</FormGroup>
									</Form>
								</div>
							</ModalBody>
						</Modal>
					</CardBody>
				</Card>
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

CreateTopic.propTypes = {
	currentUser: PropTypes.object.isRequired,
	createTopicAction: PropTypes.func.isRequired,
	addFlashMessage: PropTypes.func.isRequired
};
