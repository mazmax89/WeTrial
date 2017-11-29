import React, {Component} from 'react';
import './TopicItemStyle.scss';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Alert} from 'reactstrap';

class TopicItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {isAuthenticated} = this.props.signIn;
        let topicData = this.props.topicData;
        if (isAuthenticated) {
            return (
                <div className='topicItem'>
                    <h4>Topics:</h4>
                    <p>{topicData.topic_name}</p>
                    <p>{topicData.topic_text}</p>
                    <span>{topicData.created_at}</span>
                </div>
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

