import { connect } from 'react-redux';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  Image,
  StatusBar
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import firebaseApp from '../../firebase/config';
require('firebase/database');

class Chatroom extends React.Component {
  constructor(props) {
    super(props);
    var FirebaseDB = firebaseApp.database();
    var roomKey = this.props.navigation.state.params.chatId;
    this.messagesRef = FirebaseDB.ref(`/${roomKey}`);
    this.state = {
      user: ''
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <Text>{navigation.state.params.other.firstName}</Text>
    };
  };
  componentDidMount() {
    this.setState({ user: this.props.user });
    this.listenForMessages(this.messagesRef);
  }

  listenForMessages(messagesRef) {
    messagesRef.on('value', dataSnapshot => {
      var messagesFB = [];
      dataSnapshot.forEach(child => {
        messagesFB = [
          {
            _id: child.key,
            text: child.val().text,
            createdAt: child.val().createdAt,
            user: {
              _id: child.val().user._id,
              name: child.val().user.name
            }
          },
          ...messagesFB
        ];
      });
      this.setState({ messages: messagesFB });
    });
  }

  addMessage(message = {}) {
    this.messagesRef.push({
      text: message[0].text,
      createdAt: Date.now(),
      user: {
        _id: message[0].user._id,
        name: message[0].user.name
      }
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <GiftedChat
          messages={this.state.messages}
          onSend={this.addMessage.bind(this)}
          user={{
            _id: this.props.user.id,
            name: this.props.user.firstName
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee'
  },
  msgBox: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff'
  },
  txtInput: {
    flex: 1
  },
  listItemContainer: {
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 5
  },
  listItem: {
    fontSize: 20,
    padding: 10
  }
});

const mapStateToProps = state => {
  return {
    user: state.user,
    feed: state.feed,
    apartments: state.apartments,
    users: state.users
  };
};

const mapDispatchToProps = dispatch => ({
  getFeedData: user => dispatch(getFeedDataThunk(user)),
  getApartments: () => dispatch(getApartmentsThunk()),
  getUsers: () => dispatch(getUsersThunk())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chatroom);
