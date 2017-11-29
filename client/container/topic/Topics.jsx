import React, {Component} from 'react';
import './TopicsStyle.scss';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Alert} from 'reactstrap';
import CreateTopic from '../../components/createTopicItem/CreateTopic';
import {createTopicAction, getAllTopics} from '../../actions/topicsAction';
import {addFlashMessage} from '../../actions/flashMessageAction';
import TopicsItemList from '../../components/topicItem/TopicsItemList';

class Topics extends Component {

    constructor(props) {
        super(props);
        this.state = {
            topicsData: [],
            errors: {},
        };
        this.initData();
    }

    initData() {
        this.props.getAllTopics().then(
            (data) => {
                this.setState({topicsData: data.data.topic});
            },
            (data) => {
                this.setState({errors: data.response.data, isLoading: false});
            },
        );

    }

    render() {
        const {isAuthenticated} = this.props.signIn;

        if (isAuthenticated) {
            return (
                <div className='TopicsContainer'>
                    <CreateTopic addFlashMessage={this.props.addFlashMessage}
                                 createTopicAction={this.props.createTopicAction}/>
                    <TopicsItemList topicsData={this.state.topicsData}/>
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

Topics.PropTypes = {
    signIn: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        signIn: state.signIn
    };
}

export default connect(mapStateToProps, {createTopicAction, getAllTopics, addFlashMessage})(Topics);

