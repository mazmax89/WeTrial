import React, {Component} from 'react';
import {connect} from 'react-redux';
import FireBaseTools from '../../firebase/firebase';

class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
			message: '',
		};
	}

	read() {
		FireBaseTools.getDatabaseReference('/DongerMaster').once('value').then(snapshot => {
			this.setState({
				message: snapshot.val()
			});
		});
	}

	write() {
		FireBaseTools.getDatabaseReference('/').set({DongerMaster: 'eee'});
	}

	render() {
		return (
			<div>
				<p>{this.state.message}</p>
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
