import React from 'react';
import ReactDom from 'react-dom';
import {AppContainer} from 'react-hot-loader'
import {Provider} from 'react-redux';
import store from './store/index';
import BrowserRouter from 'react-router-dom/es/BrowserRouter';
import App from './container/App';
import {setCurrentUser} from './actions/sigInOutAction';
import * as jwt from 'jsonwebtoken';
import setAuthorizationToken from '../server/utils/setAuthorizationToken';

const DefaultStore = store();

if (localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken);
    DefaultStore.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)))
}

ReactDom.render(
  <Provider store={DefaultStore}>
    <AppContainer warnings={false}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </AppContainer>
  </Provider>,
document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./container/App.jsx', () => {
    const NextApp = require('./container/App.jsx').default;
    ReactDom.render(
      <Provider store={DefaultStore}>
        <AppContainer>
          <BrowserRouter>
            <NextApp/>
          </BrowserRouter>
        </AppContainer>
      </Provider>,
    document.getElementById('app')
  );
  });
}

