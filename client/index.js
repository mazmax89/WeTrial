import React from 'react';
import ReactDom from 'react-dom';
import Root from './Root';
import {AppContainer} from 'react-hot-loader'
import {Provider} from "react-redux";
import store from './store/store';

const DefaultStore = store();

ReactDom.render(
  <Provider store={DefaultStore}>
    <AppContainer>
      <Root/>
    </AppContainer>
  </Provider>,
document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./Root', () => {
    const NextApp = require('./Root').default;
    ReactDom.render(
      <Provider store={DefaultStore}>
        <AppContainer>
          <NextApp/>
        </AppContainer>
      </Provider>,
    document.getElementById('app')
  );
  });
}

