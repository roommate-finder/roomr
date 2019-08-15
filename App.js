import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Constants } from 'expo';
import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyCK-JUgjVNvI71cYKKKQzJQEURX3DFFnqI',
  authDomain: 'capstone-roomr.firebaseapp.com',
  databaseURL: 'https://capstone-roomr.firebaseio.com',
  projectId: 'capstone-roomr',
  storageBucket: '',
  messagingSenderId: '759179201870',
  appId: '1:759179201870:web:c501209350a62fde',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      message: '',
      messages: [],
    };
    this.addItem = this.addItem.bind(this);
  }

  componentDidMount() {
    firebase
      .database()
      .ref()
      .child('messages')
      .once('value', snapshot => {
        const data = snapshot.val();
        if (snapshot.val()) {
          const initMessages = [];
          Object.keys(data).forEach(message =>
            initMessages.push(data[message])
          );
          this.setState({
            messages: initMessages,
          });
        }
      });

    firebase
      .database()
      .ref()
      .child('messages')
      .on('child_added', snapshot => {
        const data = snapshot.val();
        if (data) {
          this.setState(prevState => ({
            messages: [data, ...prevState.messages],
          }));
        }
      });
  }

  addItem() {
    if (!this.state.message) return;

    const newMessage = firebase
      .database()
      .ref()
      .child('messages')
      .push();
    newMessage.set(this.state.message, () => this.setState({ message: '' }));
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.msgBox}>
          <TextInput
            placeholder="Enter your message"
            value={this.state.message}
            onChangeText={text => this.setState({ message: text })}
            style={styles.txtInput}
          />
          <Button title="Send" onPress={this.addItem} />
        </View>
        <FlatList
          data={this.state.messages}
          renderItem={({ item }) => (
            <View style={styles.listItemContainer}>
              <Text style={styles.listItem}>{item}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    // marginTop: Constants.statusBarHeight
  },
  msgBox: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
  },
  txtInput: {
    flex: 1,
  },
  listItemContainer: {
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 5,
  },
  listItem: {
    fontSize: 20,
    padding: 10,
  },
});
