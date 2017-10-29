import React, {Component} from 'react';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import CounterApp from './container/CounterApp';
import Home from './container/Home';


export default class Root extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/Counter' component={CounterApp}/>
        </Switch>
      </BrowserRouter>
    );
  }
}
