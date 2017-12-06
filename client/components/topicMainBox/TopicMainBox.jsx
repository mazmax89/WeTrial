import React, {Component} from 'react';
import {Col, Container} from 'reactstrap';
import './TopicMainBoxStyle.scss';

class TopicMainBox extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='topicMainContainer'>
                <Container className='topicMainItem'>

                        <Col xs='12' className='topicName'>
                        <h1>{this.props.topicData.topic_name}</h1>
                    </Col>

                    <Col className='topicInformation'>
                        <h5>created by {this.props.topicData.user_id} at {this.props.topicData.created_at}</h5>
                    </Col>

                    <Col className='topicText'>
                        <p>{this.props.topicData.topic_text}</p>
                    </Col>
                </Container>
            </div>
        );
    }
}

export default TopicMainBox;

