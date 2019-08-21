import * as firebase from 'firebase';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class StartChat extends React.Component {
  render() {
    const props = this.props.navigation.state.params;
    console.log('navigation', props);
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
export default connect(mapStateToProps)(StartChat);
