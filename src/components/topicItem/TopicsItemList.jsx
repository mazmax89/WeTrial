import React, {Component} from 'react';
import './TopicItemStyle.scss';
import PropTypes from 'prop-types';
import {Row} from 'reactstrap';
import TopicItem from './TopicItem';

class TopicsItemList extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		const topicsData = this.props.topicsData;
		return (
			<Row className='topicsList justify-content-center'>
				{
					topicsData.map((topicsData) => {
						return <TopicItem key={topicsData.topicName} topicData={topicsData}/>
					})
				}
			</Row>
		);
	}
}

TopicsItemList.propTypes = {
	topicsData: PropTypes.array.isRequired
};

export default TopicsItemList;

