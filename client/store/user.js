import axios from 'axios';

// const initialState = {
//   name: null,
//   avatar:
//     'https://abs.twimg.com/sticky/default_profile_images/default_profile_3_400x400.png',
//   authorizing: false,
//   authorized: true
// };
// export const chatUser = (state = initialState, action) => {
//   switch (action.type) {
//     case 'SET_USER_NAME':
//       return Object.assign({}, state, {
//         name: action.name
//       });
//     case 'SET_USER_AVATAR':
//       return Object.assign({}, state, {
//         avatar: action.avatar
//       });
//     case 'USER_START_AUTHORIZING':
//       return Object.assign({}, state, {
//         authorizing: true
//       });
//     case 'USER_AUTHORIZED':
//       return Object.assign({}, state, {
//         authorizing: false,
//         authorized: true
//       });
//     case 'USER_NO_EXIST':
//       return Object.assign({}, state, {
//         authorizing: false,
//         authorized: false
//       });

//     default:
//       return state;
//   }
// };
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

export const setUserThunk = formData => async dispatch => {
  try {
    const { data } = await axios.put(
      `https://7ab41a34.ngrok.io/api/users/login`,
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
      `https://7ab41a34.ngrok.io/api/users/signup`,
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
// export default function(state = {}, action) {
//   switch (action.type) {
//     case SET_USER:
//       return action.user;
//     default:
//       return state;
//   }
// }

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
