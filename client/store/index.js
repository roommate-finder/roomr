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

export const ngrok = 'https://efa2f817.ngrok.io';

const store = createStore(reducer, middleware);

export default store;
// export * from './user'
