import React, {Component} from 'react';
import './HomeStyle.scss';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class Home extends Component {

    render() {

        return (
            <main className='homePage container-fluid'>
                <div className='row justify-content-center'>

                </div>
            </main>
        );
    }
}

Home.PropTypes = {
    signIn: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        signIn: state.signIn
    };
}

export default connect(mapStateToProps, null)(Home);

