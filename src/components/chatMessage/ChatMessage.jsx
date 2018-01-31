import React, {Component} from 'react'

class ChatMessage extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const message = this.props.message;
		return (
			<div className='message-chat row'>
				<div className='col-3'>
					<img
						width='48px'
						className='circle'
						src={message.avatar}
					/>
					<span>{message.displayName}:</span>
				</div>
				<div className='col-5'>
					{message.text}
				</div>
			</div>
		)
	};
}

export default ChatMessage
