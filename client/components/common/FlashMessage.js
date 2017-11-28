import React, {Component} from 'react';
import './FlashMessageStyle.scss';
import PropTypes from 'prop-types';

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
      <div className='FlashMessageContainer'>
        {this.props.message.text}
        <a onClick={this.onClick} className='closeFlashMessage'>
          <i className='fa fa-window-close closeFlashMessage' aria-hidden='true'> </i>
        </a>
      </div>
    );
  }
}

FlashMessage.propTypes = {
  message: PropTypes.object.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired
};

export default FlashMessage;
