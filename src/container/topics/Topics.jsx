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
			topicsData: [],
			errors: {},
			isLoading: false
		};
		this.getAll = this.getAll.bind(this);
	}

	componentWillMount() {
		this.getAll();
	}

	getAll() {
		if (this.props.currentUser.isAuthenticated) {
			this.setState({isLoading: true});
			this.props.getAllTopics().then(
				(res) => {
					let snapData = res.val();
					let topicsData = [];
					for (let key in snapData ){
						topicsData.push(snapData[key]);
					}
					if (topicsData) {
						this.setState({topicsData: topicsData, isLoading: false});
					} else {
						this.setState({errors: 'No topics to show', isLoading: false});
					}
				}
			);
		}

	}

	render() {
		const {isAuthenticated} = this.props.currentUser;
		if (isAuthenticated) {
			return (
				<div className='TopicsContainer'>
				<CreateTopic addFlashMessage={this.props.addFlashMessage}
								 createTopicAction={this.props.createTopicAction}
								 currentUser={this.props.currentUser}/>
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

function mapStateToProps(state) {
	return {
		currentUser: state.currentUser
	};
}

export default connect(mapStateToProps, {createTopicAction, getAllTopics, addFlashMessage})(Topics);

Topics.propTypes = {
	currentUser: PropTypes.object.isRequired,
	getAllTopics: PropTypes.func.isRequired,
	addFlashMessage: PropTypes.func.isRequired
};
