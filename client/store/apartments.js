import axios from 'axios';
import { ngrok } from './'
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
        `${ngrok}/api/apartments`
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
