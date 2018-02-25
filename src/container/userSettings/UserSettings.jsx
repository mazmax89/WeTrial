import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateUser} from '../../actions/userActions';
import Loading from '../../components/helpers/loading';
import ChangePassword from '../../components/changePassword/ChangePassword';
import {Alert} from 'reactstrap';
import {addFlashMessage} from '../../actions/flashMessageAction';
import PropTypes from 'prop-types';

class UserSettings extends Component {

    constructor(props) {
        super(props);

        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(event) {
        event.preventDefault();
        const email = this.refs.email.value;
        const displayName = this.refs.displayName.value;
        this.props.updateUser({email, displayName}).then(
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

    render() {
        if (!this.props.currentUser.isAuthenticated) {
            return (
                <Alert color='danger' className='row justify-content-center'>
                    <span>You don't have permissions to see this</span>
                </Alert>
            );
        }
        else if (!this.props.currentUser.user.uid) {
            return <Loading/>;
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
