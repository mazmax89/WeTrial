import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import {AppContainer} from 'react-hot-loader'

ReactDom.render(
    <AppContainer>
        <App/>
    </AppContainer>,
    document.getElementById('app'));

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    ReactDom.render(
      <AppContainer>
        <NextApp/>
      </AppContainer>,
      document.getElementById('app'));
  });
}

