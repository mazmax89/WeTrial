import React, {Component} from 'react';
import {connect} from 'react-redux';
import FireBaseTools from '../firebase/firebase';

class Home extends Component {

	read() {
		FireBaseTools.getDatabaseReference('/DongerMaster').once('value').then(snapshot => {
			console.log(snapshot.val());
		});
	}

	write() {
		FireBaseTools.getDatabaseReference('/').set({DongerMaster: 'eee'});
	}

	render() {
		return (
			<div>
				<button onClick={() => this.read()}>READ!</button>
				<span>or</span>
				<button onClick={() => this.write()}>WRITE!</button>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {currentUser: state.currentUser};
}

export default connect(mapStateToProps, null)(Home);
