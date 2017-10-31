import React, {Component} from 'react';
import Home from './Home';
import Counter from '../container/CounterApp';
import Route from 'react-router-dom/es/Route';
import Header from '../components/Header.jsx';

export default class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Route path='/' exact component={Home}/>
                <Route path='/Counter' component={Counter}/>
            </div>
        );
    }
}
