import React, { Component} from 'react'
import PropTypes from 'prop-types';

class ChatInput extends Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.onSendMessage(e.target.text.value);
		e.target.text.value = '';
	}

	render() {
		return (
			<form className='page-footer blue lighten-4' onSubmit={this.handleSubmit}>
				<div className='container row'>
					<div className='col-5'>
						<input name='text' type='text'/>
					</div>
					<div className='col-3'>
						<button className='btn waves-effect waves-light blue darken-1' type='submit'>
							<i className='material-icons right'>send</i>
						</button>
					</div>
				</div>
			</form>
		)
	};
}

ChatInput.propTypes = {
	onSendMessage: PropTypes.func.isRequired,
};
export default ChatInput
