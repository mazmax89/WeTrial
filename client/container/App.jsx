import './AppStyle.scss';
import React, {Component} from 'react';
import Route from 'react-router-dom/es/Route';
import Header from '../components/Header';
import Home from './Home';
import CounterApp from './CounterApp';
import SignUp from './SignUp';
import {AnimatedSwitch} from 'react-router-transition';
import Footer from '../components/Footer';
import FlashMessagesList from '../components/common/FlashMessagesList';
import SignIn from './SignIn/SignIn';


export default class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                <FlashMessagesList/>
                <AnimatedSwitch
                    atEnter={{marginLeft: -1000, opacity: 0}}
                    atLeave={{marginLeft: 1000, opacity: 0}}
                    atActive={{marginLeft: 0, opacity: 1}}
                    className='switch-wrapper'>
                    <Route path='/' exact component={Home}/>
                    <Route path='/counter' component={CounterApp}/>
                    <Route path='/signup' component={SignUp}/>
                    <Route path='/signin' component={SignIn}/>
                </AnimatedSwitch>
                <Footer/>
            </div>
        );
    }
}
