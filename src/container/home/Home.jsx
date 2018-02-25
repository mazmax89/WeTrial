import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

export default class Home extends Component {

	render() {
		return (
			<div>
				<NavLink key='topics' to='/topic'>Topics</NavLink>
				<br/>
				<NavLink key='chat' to='/chat'>Chat</NavLink>
				<br/>
				<NavLink key='settings' to='/settings'>Settings</NavLink>
			</div>
		);
	}
}


