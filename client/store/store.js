import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

export default function configureStore() {
  const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(thunk),

  ));
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('../reducers/', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
