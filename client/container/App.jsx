import './AppStyle.scss';
import React, {Component} from 'react';
import Route from 'react-router-dom/es/Route';
import Header from '../components/Header';
import Home from './Home';
import CounterApp from './CounterApp';
import {AnimatedSwitch} from 'react-router-transition';


export default class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                <AnimatedSwitch
                    atEnter={{marginLeft: -500}}
                    atLeave={{marginLeft: -500}}
                    atActive={{marginLeft: 0}}
                    className='switch-wrapper'
                >
                    <Route path='/' exact component={Home}/>
                    <Route path='/Counter' component={CounterApp}/>
                </AnimatedSwitch>
            </div>
        );
    }
}
