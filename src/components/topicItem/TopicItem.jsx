import React, {Component} from 'react';
import './TopicItemStyle.scss';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Alert, Card, CardBody, CardSubtitle, CardText, CardTitle, Col} from 'reactstrap';
import Link from 'react-router-dom/es/Link';

class TopicItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {isAuthenticated} = this.props.currentUser;
        let topicData = this.props.topicData;
        if (isAuthenticated) {
            return (
                <Col xs='3' className='topicItem'>
                    <Card>
                        <CardBody>
                            <CardTitle>{topicData.topic_name}</CardTitle>
                            <CardSubtitle>created by {this.props.currentUser.user.username}</CardSubtitle> {/*TODO created by id=username*/}
                            <CardText>
                                <Link to={'topic/'+topicData.id}>
                                    Open{topicData.id}
                                </Link>
                                </CardText>
                        </CardBody>
                    </Card>
                </Col>
            );
        } else {
            return(
                <Alert color='danger' className='row justify-content-center'>
                    <span>You don't have permissions to see this</span>
                </Alert>
            );
        }
    }
}

TopicItem.PropTypes = {
	currentUser: PropTypes.object.isRequired
};

function mapStateToProps(state) { //TODO remove from here
    return {
		currentUser: state.currentUser
    };
}

export default connect(mapStateToProps, null)(TopicItem);
