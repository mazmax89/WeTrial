import React, {Component} from 'react';
import './TopicsStyle.scss';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Alert, Button, Card, CardBody, CardTitle, Col, Modal, ModalBody, ModalHeader, Row} from 'reactstrap';
import CreateTopic from '../../components/createTopicItem/CreateTopic';
import {createTopicAction, getAllTopics} from '../../actions/topicsAction';
import {addFlashMessage} from '../../actions/flashMessageAction';
import TopicsItemList from '../../components/topicItem/TopicsItemList';

class Topics extends Component {

	constructor(props) {
		super(props);
		this.state = {
			topicsData: [],
			errors: {},
			modal: false
		};
		this.getAll();
		this.toggle = this.toggle.bind(this);
	}

	toggle() {
		this.setState({
			modal: !this.state.modal
		});
	}

	getAll() {
		if (this.props.currentUser.isAuthenticated) {
			this.props.getAllTopics().then(
				(data) => {
					this.setState({topicsData: data.data.topic});
				},
				(data) => {
					this.setState({errors: data.response.data, isLoading: false});
				}
			);
		}

	}

	render() {
		const {isAuthenticated} = this.props.currentUser;
		if (isAuthenticated) {
			return (
				<div className='TopicsContainer'>
					<Row className='justify-content-center'>
						<Col xs='3' className='createTopicCard'>
							<Card>
								<CardBody>
									<CardTitle>Create new topic</CardTitle>
									<Button color='primary' onClick={this.toggle}>Create</Button>
									<Modal isOpen={this.state.modal} toggle={this.toggle} className='modalCreateTopic'>
										<ModalHeader toggle={this.toggle}>Create topic</ModalHeader>
										<ModalBody>
											<CreateTopic addFlashMessage={this.props.addFlashMessage} createTopicAction={this.props.createTopicAction}/>
										</ModalBody>
									</Modal>
								</CardBody>
							</Card>
						</Col>
					</Row>
					<TopicsItemList topicsData={this.state.topicsData}/>
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

Topics.PropTypes = {
	currentUser: PropTypes.object.isRequired,
	createTopicAction: PropTypes.func.isRequired,
	addFlashMessage: PropTypes.func.isRequired
};

function mapStateToProps(state) {
	return {
		currentUser: state.currentUser
	};
}

export default connect(mapStateToProps, {createTopicAction, getAllTopics, addFlashMessage})(Topics);

