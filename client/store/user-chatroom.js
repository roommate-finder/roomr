import axios from 'axios';
import { ngrok } from './';

const CREATE_USER_CHATROOM = 'CREATE_USER_CHATROOM';

const createUserChatroom = ids => ({ type: CREATE_USER_CHATROOM, ids });

export const createUserChatroomThunk = userId => async dispatch => {
  try {
    const { data } = await axios.post(`${ngrok}/api/users/${userId}`, {
      userId: userId
    });
    dispatch(createUserChatroom(data));
  } catch (err) {
    console.error(err);
  }
};

export default function(state = {}, action) {
  switch (action.type) {
    case CREATE_USER_CHATROOM:
      return action.ids;
    default:
      return state;
  }
}
