import axios from 'axios';
import { ngrok } from './';
/**
 * ACTION TYPES
 */
const SET_USER = 'SET_USER';
const CREATE_USER = 'CREATE_USER';
const UPDATE_USER = 'UPDATE_USER';
/**
 * ACTION CREATORS
 */
const setUser = user => ({ type: SET_USER, user });
const createUser = user => ({ type: CREATE_USER, user });
const setSingleUser = campus => ({
  type: SINGLE_CAMPUS,
  user
});
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
    console.log("There's an error with fetchCampus on singleCampus!");
  }
};

export const createUserThunk = formData => async dispatch => {
  try {
    const { data } = await axios.post(`${ngrok}/api/users/signup`, formData);
    dispatch(createUser(data));
  } catch (err) {
    console.error(err);
  }
};

export const updateUserThunk = user => async dispatch => {
  try {
    console.log('USER IN UPDATE USER THUNK', user);
    //const { data } = await axios.get(`${ngrok}/api/users/${user.id}`, user)
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
    default:
      return state;
  }
}
