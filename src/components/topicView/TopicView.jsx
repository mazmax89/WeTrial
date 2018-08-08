import React, {Component} from 'react';
import {Col, Container} from 'reactstrap';
import './topicViewStyle.scss';

class TopicMainBox extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='topicMainContainer'>
				<Container className='topicMainItem'>

					<Col xs='12' className='topicName'>
						<h1>{this.props.topicData.topicName}</h1>
					</Col>

					<Col className='topicInformation'>
						<h5>created by {this.props.topicData.userId}</h5>
					</Col>

					<Col className='topicText'>
						<p>{this.props.topicData.topicText}</p>
					</Col>
				</Container>
			</div>
		);
	}
}

export default TopicMainBox;

