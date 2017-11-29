import React, {Component} from 'react';
import './TopicItemStyle.scss';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Alert} from 'reactstrap';
import TopicItem from './TopicItem';

class TopicsItemList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {isAuthenticated} = this.props.signIn;
        const topicsData = this.props.topicsData;
        if (isAuthenticated) {
            return (
                <div className='topicsList'>
                    {
                        topicsData.map((topicsData) => {// eslint-disable-line
                            return <TopicItem key={topicsData.id} topicData={topicsData} />// eslint-disable-line
                        })
                    }
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

TopicsItemList.PropTypes = {
    signIn: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        signIn: state.signIn
    };
}

export default connect(mapStateToProps, null)(TopicsItemList);

