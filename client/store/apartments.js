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
<<<<<<< HEAD
        'https://7ab41a34.ngrok.io/api/apartments'
=======
        `${ngrok}/api/apartments`
>>>>>>> f49a641cacf51116a13ad3fa0b3a791fde1a9735
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
