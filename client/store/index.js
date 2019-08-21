import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import apartments from './apartments';
import chatroom from './chatroom';

import feed from './feed';
import users from './users';
const reducer = combineReducers({ user, apartments, chatroom, feed, users });
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export const ngrok = 'https://82feaea1.ngrok.io';

export default store;
// export * from './user'
