import React, {Component} from 'react';
import './MenuItemStyle.scss';
import NavLink from 'react-router-dom/es/NavLink';

export default class MenuItem extends Component {

    render() {
        return (
            <div className='menu-item'>
                <NavLink to={'/'+(this.props.to)} exact activeClassName='active'>{this.props.name}</NavLink>
            </div>
        );
    }
}
