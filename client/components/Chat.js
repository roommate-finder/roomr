import * as firebase from 'firebase';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Text } from 'react-native';

class Chat extends React.Component {
  render() {
    const props = this.props.navigation.state.params;

    const userTwo = {
      id: 4
    };
    return (
      <Button
        onPress={() => {
          const user1 = props.user.id;
          console.log('navigation', user1);
          //   const user2 = userTwo.id;
          //   const newMsgRef = firebase
          //     .database()
          //     .ref('posts')
          //     .push();
          //   newMsgRef.set({ user1: user1.id, user2: user2 });
        }}
        title="Match"
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
export default connect(mapStateToProps)(Chat);
