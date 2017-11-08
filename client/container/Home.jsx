import React, {Component} from 'react';
import MenuItem from '../components/MenuItem';
import './HomeStyle.scss';

export default class Home extends Component {
    render() {
        return (
            <main className='homePage container-fluid'>
                <div className='menu row justify-content-center'>
                    <MenuItem to='' name='Home'/>
                    <MenuItem to='Counter' name='Counter'/>
                </div>
            </main>
        );
    }
}
