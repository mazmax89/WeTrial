import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateUser} from '../../actions/userActions';
import ChangePassword from '../../components/changePassword/ChangePassword';
import {Alert} from 'reactstrap';
import {addFlashMessage} from '../../actions/flashMessageAction';
import PropTypes from 'prop-types';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

class UserSettings extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedDay: '',
		};
		this.handleDayChange = this.handleDayChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	componentDidMount() {
	}

	onFormSubmit(event) {
		let dateOfBirth = this.state.selectedDay;
		if (this.state.selectedDay === '') {
			dateOfBirth = this.props.currentUser.secondUserData.dateOfBirth;
		}
		event.preventDefault();
		const email = this.refs.email.value;
		const displayName = this.refs.displayName.value;
		const aboutUser = this.refs.aboutUser.value;
		this.props.updateUser({email, displayName, aboutUser, dateOfBirth}).then(
			(res) => {// eslint-disable-line
				this.props.addFlashMessage({
					type: 'success',
					text: 'Updated!'
				});
			},
			(data) => {
				if (data.currentUser.code) {
					this.setState({message: data.currentUser.message});
				}
			}
		);
	}

	handleDayChange(day) {
		this.setState({ selectedDay: day });
	}

	render() {
		const { selectedDay } = this.state;
		if (!this.props.currentUser.isAuthenticated) {
			return (
				<Alert color='danger' className='row justify-content-center'>
					<span>You don't have permissions to see this</span>
				</Alert>
			);
		}
		return (
			<div className='col-md-6'>
				<form id='frmProfile' role='form' onSubmit={this.onFormSubmit}>
					<h2>User Profile Page</h2>
					<br/>
					<div className='form-group'>
						<label htmlFor='email'>Email: </label>
						<input
							type='text' defaultValue={this.props.currentUser.user.email}
							className='form-control' id='email' ref='email' placeholder='Email' name='email'
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='displayName'>Display name: </label>
						<input
							type='text' defaultValue={this.props.currentUser.user.displayName}
							className='form-control' ref='displayName' id='displayName' placeholder='Display name'
							name='displayName'
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='aboutUser'>About: </label>
						<textarea
							defaultValue={this.props.currentUser.secondUserData.aboutUser}
							className='form-control' id='aboutUser' ref='aboutUser'
							placeholder='Type something about you...' name='aboutUser'
						/>
					</div>
					<div className='form-group'>
						{/*{selectedDay && <p>Day: {selectedDay.toLocaleDateString()}</p>}
						{!selectedDay && <p>Choose a day</p>}*/}
						<label>Date of birthday: </label>
						<DayPickerInput value={this.props.currentUser.secondUserData.dateOfBirth} onDayChange={this.handleDayChange} />
					</div>
					<button type='submit' className='btn btn-primary'>Update</button>
				</form>
				<ChangePassword/>
			</div>
		);
	}

}

UserSettings.propTypes = {
	updateUser: PropTypes.func.isRequired,
	addFlashMessage: PropTypes.func.isRequired,
	currentUser: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({updateUser, addFlashMessage}, dispatch);
}


function mapStateToProps(state) {
	return {currentUser: state.currentUser};
}


export default connect(mapStateToProps, mapDispatchToProps)(UserSettings);
