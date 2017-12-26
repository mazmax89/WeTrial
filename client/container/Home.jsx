import React, {Component} from 'react';
import './HomeStyle.scss';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import * as firebase from 'firebase';

const FirebaseConfig = {
    apiKey: 'AIzaSyDzwnWkLcDhvZLmkeH7_NdH0HxwjcmP67U',
    authDomain: 'wetrial-b95aa.firebaseapp.com',
    databaseURL: 'https://wetrial-b95aa.firebaseio.com',
    projectId: 'wetrial-b95aa',
    storageBucket: 'wetrial-b95aa.appspot.com',
    messagingSenderId: '531699582405'
};
const FireBase = firebase.initializeApp(FirebaseConfig);



class Home extends Component {

    constructor() {
        super();
        this.state = {
            count: 10
        };
    }

    componentDidMount() {
        let ref = FireBase.database().ref('count');
        ref.on('value', snap => {
            const count = snap.val();
            console.log(count);
            this.setState({count: count});
        });

    }

    render() {
        return (
            <main className='homePage container-fluid'>
                <div className='row justify-content-center'>
                    <h1>{this.state.count}</h1>
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

