import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import apartments from './apartments';
import feed from './feed';
import users from './users';
import unseenApartments from './unseen-apartments';
import userApartments from './user-apartments';

const reducer = combineReducers({
  user,
  apartments,
  feed,
  users,
  unseenApartments
  // userApartments
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export const ngrok = 'https://aa0024b6.ngrok.io';

export default store;
// export * from './user'
