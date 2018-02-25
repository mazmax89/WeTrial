import React, {Component} from 'react';
import './TopicItemStyle.scss';
import PropTypes from 'prop-types';
import {Card, CardBody, CardSubtitle, CardText, CardTitle, Col} from 'reactstrap';
import Link from 'react-router-dom/es/Link';

class TopicItem extends Component {

	render() {
		let topicData = this.props.topicData;
		return (
			<Col xs='3' className='topicItem'>
				<Card>
					<CardBody>
						<CardTitle>{topicData.topicName}</CardTitle>
						<CardSubtitle>created by {topicData.user}</CardSubtitle> {/*TODO created by id=username*/}
						<CardText>
							<Link to={'topic/' + topicData}>
								Open{topicData.topicName}
							</Link>
						</CardText>
					</CardBody>
				</Card>
			</Col>
		);
	}
}

TopicItem.propTypes = {
	topicData: PropTypes.object.isRequired
};

export default TopicItem;

