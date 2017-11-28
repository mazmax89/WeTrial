import React, {Component} from 'react';
import './TopicsStyle.scss';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Alert} from 'reactstrap';
import CreateTopic from '../../components/createTopicItem/CreateTopic'
import {createTopicAction} from '../../actions/topicsAction';

class Topics extends Component {

  render() {
    const {isAuthenticated} = this.props.signIn;

    if (isAuthenticated) {
      return (
        <div className='Posts'>
          <CreateTopic createTopicAction = {this.props.createTopicAction}/>
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

Topics.PropTypes = {
  signIn: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    signIn: state.signIn
  };
}

export default connect(mapStateToProps, {createTopicAction})(Topics);

