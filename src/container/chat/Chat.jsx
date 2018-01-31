import React, {Component} from 'react';
import {connect} from 'react-redux';
import ChatMessage from '../../components/chatMessage/ChatMessage.jsx';
import ChatInput from '../../components/chatMessage/ChatInput.jsx';
import FireBaseTools from '../../firebase/firebase';

class Chat extends Component {

	constructor(props) {
		super(props);
		this.state = {
			messages: [],
			count: 0
		};
		this.messagesDB = FireBaseTools.getDatabaseReference('/messages');
		this.handleSendMessage = this.handleSendMessage.bind(this)
	}

	componentWillMount() {
		this.messagesDB.on('child_added', snap => {
			this.setState({
				messages: this.state.messages.concat(snap.val())
			})
		})
	}

	componentWillUnmount() {
		this.messagesDB.off()
	}

	handleSendMessage(text) {
		let newUserMessage = this.messagesDB.push();
		let msg = {
			text,
			avatar: this.props.currentUser.user.photoURL,
			displayName: this.props.currentUser.user.displayName,
			date: Date.now()
		};
		newUserMessage.set(msg);
	}

	render() {
		return (
			<div>
				<div className='container'>
					{
						this.state.messages.map(msg => (
							<ChatMessage
								key={msg.date}
								message={msg}
							/>
						)).reverse()
					}
				</div>
				<ChatInput onSendMessage={this.handleSendMessage}/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {currentUser: state.currentUser};
}

export default connect(mapStateToProps, null)(Chat);
