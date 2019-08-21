import axios from 'axios';
import { ngrok } from './'
/**
 * ACTION TYPES
 */

export const GET_FEED_DATA = 'GET_FEED_DATA';

/**
 * ACTION CREATORS
 */
export const getFeedData = data => ({
    type: GET_FEED_DATA,
    data
});

/**
 * THUNK CREATORS
 */
export const getFeedDataThunk = (user) => {
    return async dispatch => {
        try {
            const { data } = await axios.get(
                `${ngrok}/api/user-apartment/${user.id}`
            );
            await dispatch(getFeedData(data));
        } catch (err) {
            console.error(err);
        }
    };
};

/**
 * REDUCER
 */
const feedReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_FEED_DATA:
            return action.data;

        default:
            return state;
    }
};

export default feedReducer;
