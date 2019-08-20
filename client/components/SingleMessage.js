import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import store from '../store/index';
import ChatUI from './ChatUI';
import LoginUI from './LoginUI';
import { fetchMessages, checkUserExists } from '../actions';
import { FirebaseWrapper } from '../../firebase/firebase';
const loggerMiddleware = createLogger();

// const stuff = createStore(store, applyMiddleware(thunkMiddleware));

import { Examples } from '@shoutem/ui';

class SingleMessage extends Component {
  //   constructor() {
  //     super();
  //     this.state = {
  //       posts: []
  //     };
  //   }
  //   async componentDidMount() {
  //     await FirebaseWrapper.GetInstance().SetupCollectionListener(
  //       'posts',
  //       posts => this.setState({ posts })
  //     );
  //   }
  render() {
    return (
      <Provider store={store}>
        <ChatUI />
      </Provider>
    );
  }
}

export default SingleMessage;
