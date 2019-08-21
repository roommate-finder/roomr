import React from 'react';
// import { StyleSheet, View, TextInput } from 'react-native';
import { Button, Text } from 'native-base';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

class StartChat extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {  }
  // }

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
            .ref('bryanChatRooms')
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
export default connect(mapStateToProps)(StartChat);
