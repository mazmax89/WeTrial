import React, {Component} from 'react';
import MenuItem from '../components/MenuItem';
import './HomeStyle.scss';

export default class Home extends Component {
    render() {
        return (
            <div className='homePage container-fluid justify-content-center'>
                <div className='row menu'>
                    <MenuItem to='' name='Home'/>
                    <MenuItem to='Counter' name='Counter'/>
                </div>
            </div>
        );
    }
}
