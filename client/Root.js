import React, {Component} from 'react';
import {Route, BrowserRouter} from 'react-router-dom';
import CounterApp from './container/CounterApp';


export default class Root extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
            <Route component={CounterApp}/>
        </BrowserRouter>
      </div>
    )
      ;
  }
}
