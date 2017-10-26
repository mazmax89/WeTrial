/*
import React from 'react';
import { createStore as initialCreateStore, compose } from 'redux';

export let createStore = initialCreateStore;

const isDev = process.env.NODE_ENV;
if (isDev === 'development') {
  createStore = compose(
    require('redux-devtools').devTools(),
    require('redux-devtools').persistState(
      window.location.href.match(/[?&]debug_session=([^&]+)\b/)
    ),
    createStore
  );
}

export function renderDevTools(store) {
  if (__DEV__) {
    let {DevTools, DebugPanel, LogMonitor} = require('redux-devtools/lib/react');
    return (
      <DebugPanel top right bottom>
        <DevTools store={store} monitor={LogMonitor} />
      </DebugPanel>
    );
  }
  return null;
}
*/
