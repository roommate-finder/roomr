import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import apartments from './apartments';
import chatroom from './chatroom';
const reducer = combineReducers({ user, apartments, chatroom });
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export const ngrok = 'https://2c81ae9c.ngrok.io'

export default store;
// export * from './user'
