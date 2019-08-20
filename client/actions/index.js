import * as firebase from 'firebase';

export const setUserName = name => ({
  type: 'SET_USER_NAME',
  name
});

export const addMessage = msg => ({
  type: 'ADD_MESSAGE',
  ...msg
});
export const sendMessage = (text, user) => {
  return function(dispatch) {
    let msg = {
      text: text,
      time: Date.now(),
      author: {
        firstName: user.firstName,
        photo: user.photo
      }
    };
    const newMsgRef = firebase
      .database()
      .ref('messages')
      .push();
    msg.id = newMsgRef.key;
    newMsgRef.set(msg);
    dispatch(addMessage(msg));
  };
};
export const fetchMessages = () => {
  return function(dispatch) {
    dispatch(startFetchingMessages());

    firebase
      .database()
      .ref('messages')
      .on('value', snapshot => {
        setTimeout(() => {
          const messages = snapshot.val() || [];
          dispatch(receiveMessages(messages));
        }, 0);
      });
  };
};

export const receiveMessages = messages => {
  return function(dispatch) {
    Object.values(messages).forEach(msg => dispatch(addMessage(msg)));
    dispatch(receivedMessages());
  };
};

export const updateMessagesHeight = event => {
  const layout = event.nativeEvent.layout;
  return {
    type: 'UPDATE_MESSAGES_HEIGHT',
    height: layout.height
  };
};
export const login = () => {
  return function(dispatch) {
    dispatch(startAuthorizing());

    firebase
      .auth()
      .signInAnonymously()
      .then(() => {
        dispatch(userAuthorized());
        dispatch(fetchMessages());
      });
  };
};
