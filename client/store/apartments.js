import axios from 'axios';

/**
 * ACTION TYPES
 */

export const GET_APARTMENTS = 'GET_APARTMENTS';

/**
 * ACTION CREATORS
 */

export const getApartments = apartments => ({
  type: GET_APARTMENTS,
  apartments
});

/**
 * THUNK CREATORS
 */

export const getApartmentsThunk = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get(
        'https://8e6d7c94.ngrok.io/api/apartments'
      );
      await dispatch(getApartments(data));
    } catch (err) {
      console.error(err);
    }
  };
};

/**
 * REDUCER
 */

const apartmentsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_APARTMENTS:
      return action.apartments;

    default:
      return state;
  }
};

export default apartmentsReducer;