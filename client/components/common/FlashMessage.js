import React, {Component} from 'react';
import './FlashMessageStyle.scss';
import PropTypes from 'prop-types';
import {Alert} from 'reactstrap';

class FlashMessage extends Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.deleteFlashMessage(this.props.message.id);
  }

  render() {
    return (
      <Alert className='FlashMessageContainer' color='success'>
        {this.props.message.text}
        <a onClick={this.onClick} className='closeFlashMessage'>
          <i className='fa fa-window-close closeFlashMessage' aria-hidden='true'> </i>
        </a>
      </Alert>
    );
  }
}

FlashMessage.propTypes = {
  message: PropTypes.object.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired
};

export default FlashMessage;
