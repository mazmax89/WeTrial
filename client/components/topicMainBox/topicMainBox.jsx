import React, {Component} from 'react';
import { Col, Row} from 'reactstrap';

class TopicMainBox extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
            return (
                <div className='topicMainContainer'>
                    <Row>
                        <Col xs='12' className='topicMain'>
                            <h1>{this.props.topicData.topic_name}</h1>
                            {this.props.topicData.topic_text}
                        </Col>
                    </Row>
                </div>
            );
    }
}

export default TopicMainBox;

