import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

/* eslint-disable no-underscore-dangle */
export default function configureStore() {
  const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(thunk),

  ));
  /* eslint-enable */
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('../reducers/', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
