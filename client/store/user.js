import axios from 'axios';

const initialState = {
  name: null,
  avatar:
    'https://abs.twimg.com/sticky/default_profile_images/default_profile_3_400x400.png',
  authorizing: false,
  authorized: true
};
const user = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_NAME':
      return Object.assign({}, state, {
        name: action.name
      });
    case 'SET_USER_AVATAR':
      return Object.assign({}, state, {
        avatar: action.avatar
      });
    case 'USER_START_AUTHORIZING':
      return Object.assign({}, state, {
        authorizing: true
      });
    case 'USER_AUTHORIZED':
      return Object.assign({}, state, {
        authorizing: false,
        authorized: true
      });
    default:
      return state;
  }
};
/**
 * ACTION TYPES
 */
const SET_USER = 'GET_USER';

/**
 * ACTION CREATORS
 */
const setUser = user => ({ type: GET_USER, user });

/**
 * THUNK CREATORS
 */
export const setUserThunk = user => async dispatch => {
  try {
    const { data } = await axios.get(
      `https://d4ca50f0.ngrok.io/api/user/${user.id}`
    );
    dispatch(getUser(data));
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

export default user;
