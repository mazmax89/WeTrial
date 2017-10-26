import React, {Component} from 'react';
import {Route, Router, BrowserRouter} from 'react-router-dom';
import App from "./container/App";
import Hello from "./container/Hello";


export default class Root extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
            <Route component={Hello}/>
        </BrowserRouter>
      </div>
    )
      ;
  }
}
