import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Alert, Col, Row} from 'reactstrap';
import {addFlashMessage} from '../../actions/flashMessageAction';
import {getTopicById} from '../../actions/topicAction';
import TopicMainBox from '../../components/topicView/TopicView';

class TopicMain extends Component {

	constructor(props) {
		super(props);
		this.state = {
			topicsData: [],
			errors: {}
		};
	}

	componentWillMount() {
		this.getById();
	}

	getById() {
		let topicId = this.props.match.params.id;
		this.props.getTopicById(topicId).then(
			(data) => {
				let topic = data.val();
				this.setState({topicsData: topic});
			},
			(res) => {
				console.log(res);
				this.setState({errors: res.response.data, isLoading: false});
			}
		);
	}

	render() {
		const {isAuthenticated} = this.props.currentUser;
		if (isAuthenticated) {
			return (
				<div className='topicMainContainer'>
					<Row>
						<Col xs='12' className='topicMain'>
							<TopicMainBox topicData={this.state.topicsData}/>
						</Col>
					</Row>
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

TopicMain.propTypes = {
	currentUser: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		currentUser: state.currentUser
	};
}

export default connect(mapStateToProps, {addFlashMessage, getTopicById})(TopicMain);

