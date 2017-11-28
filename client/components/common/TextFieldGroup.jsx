import React, {Component} from 'react';
import {Input} from 'reactstrap';
import './TextFieldGroupStyles.scss';

class TextFieldGroup extends Component {

    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        let warningClass = 'formControl';
        if (this.props.error) {
            warningClass = 'formControl warningInput';
        }
        return (
            <div className='textField'>
                <Input className={warningClass}
                       type={this.props.type}
                       name={this.props.field}
                       placeholder={this.props.label}
                       onChange={this.props.onChanged}
                       maxLength={32}
                />
                {this.props.error && <span className='warning'>{this.props.error}</span>}
            </div>
        );
    }
}

export default TextFieldGroup;
