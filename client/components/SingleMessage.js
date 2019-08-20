import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import store from '../store/index';
import ChatUI from './ChatUI';
import LoginUI from './LoginUI';
import { fetchMessages, checkUserExists } from '../actions';

const loggerMiddleware = createLogger();

// const stuff = createStore(store, applyMiddleware(thunkMiddleware));

import { Examples } from '@shoutem/ui';

const LoginOrChat = () => {
  //   authorized: state.user.authorized
  // }))(({ authorized }) => {
  //   if (authorized) {
  //     return <ChatUI />;
  //   } else {
  //     return null;

  //   }
  return <ChatUI />;
};

class SingleMessage extends Component {
  render() {
    return (
      <Provider store={store}>
        <LoginOrChat />
      </Provider>
    );
  }
}

export default SingleMessage;
