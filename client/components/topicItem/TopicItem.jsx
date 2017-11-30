import React, {Component} from 'react';
import './TopicItemStyle.scss';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Alert, Card, CardBody, CardSubtitle, CardText, CardTitle, Col} from 'reactstrap';

class TopicItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {isAuthenticated} = this.props.signIn;
        let topicData = this.props.topicData;
        if (isAuthenticated) {
            return (
                <Col xs='3' className='topicItem'>
                    <Card>
                        <CardBody>
                            <CardTitle>{topicData.topic_name}</CardTitle>
                            <CardSubtitle>{topicData.created_at}</CardSubtitle>
                            <CardText>{topicData.topic_text}</CardText>
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
    signIn: PropTypes.object.isRequired
};

function mapStateToProps(state) { //TODO remove from here
    return {
        signIn: state.signIn
    };
}

export default connect(mapStateToProps, null)(TopicItem);

