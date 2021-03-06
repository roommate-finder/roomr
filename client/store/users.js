import axios from 'axios';
import { ngrok } from './';

const GET_USERS = 'GET_USERS';
const GET_USERS_CHATROOM = 'GET_USERS_CHATROOM';
const getUserChatroom = users => ({ type: GET_USERS_CHATROOM, users });
const getUsers = users => ({ type: GET_USERS, users });
export const getUsersThunk = users => async dispatch => {
  try {
    const { data } = await axios.get(`${ngrok}/api/users`);
    dispatch(getUsers(data));
  } catch (err) {
    console.error(err);
  }
};

export const getUsersChatroomThunk = userId => async dispatch => {
  try {
    const { data } = await axios.get(`${ngrok}/api/users/${userId}`);
    dispatch(getUserChatroom(data));
  } catch (err) {
    console.error(err);
  }
};

export default function(state = [], action) {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    case GET_USERS_CHATROOM:
      return action.users;
    default:
      return state;
  }
}

/**
//  * ACTION TYPES
//  */
// const SET_USER = 'GET_USER';

// /**
//  * ACTION CREATORS
//  */
// const setUser = user => ({ type: SET_USER, user });

// /**
//  * THUNK CREATORS
//  */
// export const setUserThunk = user => async dispatch => {
//   try {
//     const { data } = await axios.get(
//       `https://2c81ae9c.ngrok.io/api/user/${user.id}`
//     );
//     dispatch(setUser(data));
//   } catch (err) {
//     console.error(err);
//   }
// };
