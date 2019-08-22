import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import apartments from './apartments';
import feed from './feed';
import users from './users';

const reducer = combineReducers({ user, apartments, feed, users });
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

<<<<<<< HEAD
export const ngrok = 'https://af2a44ba.ngrok.io';
=======
export const ngrok = 'https://09e865df.ngrok.io';
>>>>>>> b2cb4f791e42416fdb2415db6383f8e49889025f

export default store;
// export * from './user'
