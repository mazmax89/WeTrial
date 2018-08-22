import './AppStyle.scss';
import React, {Component} from 'react';
import Route from 'react-router-dom/es/Route';
import Home from './home/Home';
import SignUp from './signUp/SignUp';
import {AnimatedSwitch} from 'react-router-transition';
import Footer from '../components/footer/Footer';
import SignIn from './signIn/SignIn';
import Topics from './topics/Topics';
import TopicMain from './topicView/TopicView';
import UserSettings from './userSettings/UserSettings';
import ResetPasswordForm from '../components/resetPassword/ResetPasswordForm';
import FlashMessagesList from '../components/common/FlashMessagesList';
import Header from '../components/header/Header';
import Chat from './chat/Chat';
import {Loader} from 'react-loaders';

export default class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
		};
	}

	componentDidMount() {
		setTimeout(() => this.setState({isLoading: false}), 1500); // simulates an async action, and hides the spinner
	}

	render() {
		if (this.state.isLoading) return (<Loader type='line-scale' color={'#36b5e0'} active/>);
		return (
			<div className='appContainer'>
				<Header/>
				<FlashMessagesList/>
				<AnimatedSwitch
					atEnter={{marginLeft: -1000, opacity: 0}}
					atLeave={{marginLeft: 1000, opacity: 0}}
					atActive={{marginLeft: 0, opacity: 1}}
					className='switch-wrapper'>
					<Route path='/' exact component={Home}/>
					<Route path='/chat' component={Chat}/>
					<Route path='/signup' component={SignUp}/>
					<Route path='/signin' component={SignIn}/>
					<Route path='/settings' component={UserSettings}/>
					<Route path='/topic/:id' component={TopicMain}/>
					<Route path='/topic' component={Topics}/>
					<Route path='/reset' component={ResetPasswordForm}/>
				</AnimatedSwitch>
				<Footer/>
			</div>
		);
	}
}
