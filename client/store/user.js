import axios from 'axios';
import { ngrok } from './'
/**
 * ACTION TYPES
 */
// const GET_USER = 'GET_USER'
const SET_USER = 'SET_USER';
const CREATE_USER = 'CREATE_USER';
const UPDATE_USER = 'UPDATE_USER'
/**
 * ACTION CREATORS
 */
// const getUser = user => ({ type: GET_USER, user })
const setUser = user => ({ type: SET_USER, user });
const createUser = user => ({ type: CREATE_USER, user });
const updateUser = user => ({ type: UPDATE_USER, user })
/**
 * THUNK CREATORS
 */


// export const getUserThunk = (user) => {
//     return async dispatch => {
//         try {
//             const { data } = await axios.get(`${ngrok}/api/users/${user.id}`)
//             dispatch(getUser(data))
//         }
//         catch (err) {
//             console.error(err)
//         }
//     }
// }

export const setUserThunk = formData => async dispatch => {
    try {

        const { data } = await axios.put(
            `${ngrok}/api/users/login`,
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
            `${ngrok}/api/users/signup`,
            formData
        );
        dispatch(createUser(data));
    } catch (err) {
        console.error(err);
    }
};

export const updateUserThunk = user => async dispatch => {
    try {
        console.log('USER IN UPDATE USER THUNK', user)
        //const { data } = await axios.get(`${ngrok}/api/users/${user.id}`, user)
        const { data } = await axios.put(`${ngrok}/api/users/${user.id}`, user)
        console.log("DATA", data)
        dispatch(updateUser(data))
    } catch (error) {
        console.error(error)
    }
}

/**
 * REDUCER
 */
export default function (state = {}, action) {
    switch (action.type) {
        // case GET_USER:
        //     return action.user;
        case SET_USER:
            return action.user;
        case CREATE_USER:
            return action.user;
        case UPDATE_USER:
            return action.user;
        default:
            return state;
    }
}
