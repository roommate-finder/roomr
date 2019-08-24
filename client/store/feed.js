import axios from 'axios';
import { ngrok } from './';
/**
 * ACTION TYPES
 */

export const GET_FEED_DATA = 'GET_FEED_DATA';
const DELETE_USER_APARTMENT = 'DELETE_USER_APARTMENT';

/**
 * ACTION CREATORS
 */
export const getFeedData = data => ({
  type: GET_FEED_DATA,
  data
});

const deleteUserApartment = id => ({ type: DELETE_USER_APARTMENT, id });

/**
 * THUNK CREATORS
 */
export const getFeedDataThunk = user => {
  return async dispatch => {
    try {
      const { data } = await axios.get(
        `${ngrok}/api/user-apartment/${user.id}`
      );
      console.log('TCL: data', data);
      await dispatch(getFeedData(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const deleteUserApartmentThunk = (
  userId,
  apartmentId
) => async dispatch => {
  try {
    console.log('TCL: userId', userId);
    console.log('TCL: apartmentId', apartmentId);

    await axios.put(`${ngrok}/api/user-apartment/delete/`, {
      userId: userId,
      apartmentId: apartmentId
    });
    dispatch(deleteUserApartment(apartmentId));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
const feedReducer = (state = [], action) => {
  console.log('action id', action.id);

  console.log('ACTION', action);
  switch (action.type) {
    case GET_FEED_DATA:
      return action.data;
    case DELETE_USER_APARTMENT:
      console.log('FEED REDUCER STATE FIRST ELT', state[0]);
      console.log('FEED REDUCER STATE LENGTH', state.length)
      let first = state[0]
      return [
        first.filter(apartment => {
          return Number(apartment.apartmentId) !== action.id;
        })
      ];
    default:
      return state;
  }
};

export default feedReducer;
