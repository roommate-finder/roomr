import axios from 'axios';

/**
 * ACTION TYPES
 */

const CREATE_USER_APARTMENT = 'CREATE_USER_APARTMENT';

/**
 * ACTION CREATORS
 */
const createUserApartment = ids => ({ type: CREATE_USER_APARTMENT, ids });

/**
 * THUNK CREATORS
 */

export const createUserApartmentThunk = ids => async dispatch => {
  try {
    const { data } = await axios.post(
      `https://7ab41a34.ngrok.io/api/user-apartments/create`,
      ids
    );
    dispatch(createUserApartment(data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case CREATE_USER_APARTMENT:
      return action.ids;
    default:
      return state;
  }
}
