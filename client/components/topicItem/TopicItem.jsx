import React, {Component} from 'react';
import './PostsStyle.scss';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Alert} from 'reactstrap';

class TopicItem extends Component {

    render() {
        const {isAuthenticated} = this.props.signIn;

        if (isAuthenticated) {
            return (
                <div className='Posts'>

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

function mapStateToProps(state) {
    return {
        signIn: state.signIn
    };
}

export default connect(mapStateToProps, null)(TopicItem);

