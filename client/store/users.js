import axios from 'axios';

/**
 * ACTION TYPES
 */
const SET_USER = 'GET_USER';

/**
 * ACTION CREATORS
 */
const setUser = user => ({ type: SET_USER, user });

/**
 * THUNK CREATORS
 */
export const setUserThunk = user => async dispatch => {
  try {
    const { data } = await axios.get(
      `https://2c81ae9c.ngrok.io/api/user/${user.id}`
    );
    dispatch(setUser(data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
}
