import axios from 'axios';
import { ngrok } from './'
/**
 * ACTION TYPES
 */

export const GET_UNSEEN_APARTMENTS = 'GET_UNSEEN_APARTMENTS';

/**
 * ACTION CREATORS
 */

export const getUnseenApartments = apartments => ({
    type: GET_UNSEEN_APARTMENTS,
    apartments
});

/**
 * THUNK CREATORS
 */

export const getUnseenApartmentsThunk = (user) => {
    return async dispatch => {
        try {
            const { data } = await axios.get(
                `${ngrok}/api/apartments/show/${user.id}`
            );
            dispatch(getUnseenApartments(data));
        } catch (err) {
            console.error(err);
        }
    };
};

/**
 * REDUCER
 */

const unseenApartmentsReducer = (state = [], action) => {
    switch (action.type) {
        case GET_UNSEEN_APARTMENTS:
            return action.apartments;

        default:
            return state;
    }
};

export default unseenApartmentsReducer;
