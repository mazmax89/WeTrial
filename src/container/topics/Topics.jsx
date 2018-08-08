import React, {Component} from 'react';
import './TopicsStyle.scss';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Alert} from 'reactstrap';
import CreateTopic from '../../components/createTopicItem/CreateTopic';
import {createTopicAction, getAllTopics} from '../../actions/topicAction';
import {addFlashMessage} from '../../actions/flashMessageAction';
import TopicsItemList from '../../components/topicItem/TopicsItemList';

class Topics extends Component {

	constructor(props) {
		super(props);
		this.state = {
			errors: {},
			isLoading: false
		};
	}

	componentWillUnmount() {
		this.props.getAllTopics(false);
	}

	componentWillMount() {
		this.props.getAllTopics(true);
	}

	render() {
		const {isAuthenticated} = this.props.currentUser;
		if (isAuthenticated) {
			return (
				<div className='TopicsContainer'>
				<CreateTopic addFlashMessage={this.props.addFlashMessage}
								 createTopicAction={this.props.createTopicAction}
								 currentUser={this.props.currentUser}/>
						<TopicsItemList topicsData={this.props.topicsData}/>
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

function mapStateToProps(state) {
	return {
		currentUser: state.currentUser,
		topicsData: state.topics
	};
}

export default connect(mapStateToProps, {createTopicAction, getAllTopics, addFlashMessage})(Topics);

Topics.propTypes = {
	currentUser: PropTypes.object.isRequired,
	getAllTopics: PropTypes.func.isRequired,
	addFlashMessage: PropTypes.func.isRequired
};
