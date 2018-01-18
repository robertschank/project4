import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';

import App from './App';
import TabbedNavigator from './TabbedNavigator';
import { Button, CardSection, Spinner } from './components/common';
import Game from './components/Game';
import reducers from './reducers';

export default class AppProvider extends Component {

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}