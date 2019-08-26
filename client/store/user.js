import axios from 'axios';
import { ngrok } from './';

/**
 * ACTION TYPES
 */
const SET_USER = 'SET_USER';
const CREATE_USER = 'CREATE_USER';
const UPDATE_USER = 'UPDATE_USER';
const GET_USER_CHATROOM = 'GET_USER_CHATROOM';
/**
 * ACTION CREATORS
 */

const setUser = user => ({ type: SET_USER, user });
const createUser = user => ({ type: CREATE_USER, user });
const getUserChat = user => ({ type: GET_USER_CHATROOM, user });

const updateUser = user => ({ type: UPDATE_USER, user });

/**
 * THUNK CREATORS
 */

export const setUserThunk = formData => async dispatch => {
  try {
    const { data } = await axios.put(`${ngrok}/api/users/login`, formData);

    dispatch(setUser(data));
  } catch (err) {
    console.error(err);
  }
};

export const fetchUserThunk = userId => async dispatch => {
  try {
    const userPath = `/api/users/${userId}`;
    const responses = await Promise.all([axios.get(userPath)]);
    const [users, chatroom] = responses.map(res => res.data);
    users.chatroom = chatroom;
    dispatch(setSingleUser(users));
  } catch (err) {
    console.error(err);
  }
};

export const getUserChatroomThunk = userId => async dispatch => {
  try {
    const { data } = await axios.get(`${ngrok}/api/users/${userId}`);
    dispatch(getUserChat(data));
  } catch (err) {}
};

export const createUserThunk = formData => async dispatch => {
  try {
    const { data } = await axios.post(`${ngrok}/api/users/signup`, formData);
    dispatch(createUser(data));
    dispatch(setUser(data));
  } catch (err) {
    console.error(err);
  }
};

export const updateUserThunk = user => async dispatch => {
  try {
    console.log('USER IN UPDATE USER THUNK', user);
    const { data } = await axios.put(`${ngrok}/api/users/${user.id}`, user);
    console.log('DATA', data);
    dispatch(updateUser(data));
  } catch (error) {
    console.error(error);
  }
};

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return action.user;
    case CREATE_USER:
      return action.user;
    case UPDATE_USER:
      return action.user;
    case GET_USER_CHATROOM:
      return action.user;
    default:
      return state;
  }
}
