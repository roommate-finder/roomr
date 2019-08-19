import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_USER = 'SET_USER'

/**
 * ACTION CREATORS
 */
const setUser = user => ({ type: SET_USER, user })


/**
 * THUNK CREATORS
 */
export const setUserThunk = (phone) => async dispatch => {
    try {
        const { data } = await axios.get(` https://efdaf4f1.ngrok.io/api/users/${phone}`)
        dispatch(setUser(data))
    } catch (err) {
        console.error(err)
    }
}

/**
 * REDUCER
 */
export default function (state = {}, action) {
    switch (action.type) {
        case SET_USER:
            return action.user
        default:
            return state
    }
}