import React, {Component} from 'react';
import Home from './Home';
import Counter from '../container/CounterApp';
import Route from 'react-router-dom/es/Route';
import NavLink from 'react-router-dom/es/NavLink';

export default class App extends Component {
    render() {
        return (
            <div>
                <NavLink to='/' exact activeClassName='active'>Home</NavLink>
                <NavLink to='/Counter' exact activeClassName='active'>Counter</NavLink>
                <hr/>
                <Route path='/' exact component={Home}/>
                <Route path='/Counter' component={Counter}/>
            </div>
        );
    }
}
