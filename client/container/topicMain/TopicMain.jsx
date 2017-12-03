import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Alert, Col, Row} from 'reactstrap';
import {addFlashMessage} from '../../actions/flashMessageAction';
import {getTopicById} from '../../actions/topicsAction';

class TopicMain extends Component {

    constructor(props) {
        super(props);
        this.state = {
            topicsData: [],
            errors: {}
        };
    }

    getById() {
        if (this.props.signIn.isAuthenticated) {
            this.props.getTopicById('1').then(
                (data) => {
                    this.setState({topicsData: data.data.topic});
                },
                (data) => {
                    this.setState({errors: data.response.data, isLoading: false});
                }
            );
        }
    }

    render() {
        const {isAuthenticated} = this.props.signIn;

        if (isAuthenticated) {
            return (
                <div className='topicMainContainer'>
                    <Row>
                        <Col xs='12' className='topicMain'>
                            <h1>Topic!!!!!</h1>
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

TopicMain.PropTypes = {
    signIn: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        signIn: state.signIn
    };
}

export default connect(mapStateToProps, {addFlashMessage, getTopicById})(TopicMain);

