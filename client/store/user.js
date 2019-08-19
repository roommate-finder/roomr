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
export const setUserThunk = (user) => async dispatch => {
    try {
        const { data } = await axios.get(`https://d4ca50f0.ngrok.io/api/user/${user.id}`)
        dispatch(getUser(data))
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