import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import store from '../store/index';
import ChatUI from './ChatUI';
import LoginUI from './LoginUI';
import { fetchMessages, checkUserExists } from '../actions';
import { FirebaseWrapper } from '../../firebase/firebase';
const loggerMiddleware = createLogger();

import * as firebase from 'firebase';

class SingleMessages extends React.Component {
  render() {
    const userTwo = {
      id: 4
    };
    return (
      <Button
        onPress={() => {
          const user1 = this.props.user.id;
          const user2 = userTwo.id;
          const newMsgRef = firebase
            .database()
            .ref('posts')
            .push();
          newMsgRef.set({ user1: user1.id, user2: user2 });
        }}
      >
        <Text>Match</Text>
      </Button>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  };
};
export default connect(mapStateToProps)(SingleMessages);
// const stuff = createStore(store, applyMiddleware(thunkMiddleware));

// import { Examples } from '@shoutem/ui';

// class SingleMessage extends Component {
//   //   constructor() {
//   //     super();
//   //     this.state = {
//   //       posts: []
//   //     };
//   //   }
//   //   async componentDidMount() {
//   //     await FirebaseWrapper.GetInstance().SetupCollectionListener(
//   //       'posts',
//   //       posts => this.setState({ posts })
//   //     );
//   //   }
//   render() {
//     return (
//       <Provider store={store}>
//         <ChatUI />
//       </Provider>
//     );
//   }
// }

// export default SingleMessage;
