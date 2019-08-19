import axios from 'axios';

/**
 * ACTION TYPES
 */
const SET_USER = 'SET_USER';
const CREATE_USER = 'CREATE_USER';
/**
 * ACTION CREATORS
 */
const setUser = user => ({ type: SET_USER, user });
const createUser = user => ({ type: CREATE_USER, user });
/**
 * THUNK CREATORS
 */
// export const setUserThunk = user => async dispatch => {
//   try {
//     const { data } = await axios.get(
//       ` https://8e6d7c94.ngrok.io/api/user/${user.id}`
//     );
//     dispatch(setUser(data));
//   } catch (err) {
//     console.error(err);
//   }
// };

export const setUserThunk = formData => async dispatch => {
  try {
    const { data } = await axios.put(
      `https://8e6d7c94.ngrok.io/api/users/login`,
      formData
    );
    dispatch(setUser(data));
  } catch (err) {
    console.error(err);
  }
};

export const createUserThunk = formData => async dispatch => {
  try {
    const { data } = await axios.post(
      `https://8e6d7c94.ngrok.io/api/users/signup`,
      formData
    );
    dispatch(createUser(data));
  } catch (err) {
    console.error(err);
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
    default:
      return state;
  }
}
