import React, {Component} from 'react';
import App from './container/App.jsx';
import BrowserRouter from 'react-router-dom/es/BrowserRouter';



export default class Root extends Component {
  render() {
    return (
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    );
  }
}
