import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  YellowBox
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Constants } from 'expo';
import Login from './Login';
import * as firebase from 'firebase';
import axios from 'axios';
import AppNavigator from './AppNavigator';
//Redux stuff
import { Provider } from 'react-redux';
import store from '../store';

YellowBox.ignoreWarnings(['Require cycle:']);

var firebaseConfig = {
  apiKey: 'AIzaSyCK-JUgjVNvI71cYKKKQzJQEURX3DFFnqI',
  authDomain: 'capstone-roomr.firebaseapp.com',
  databaseURL: 'https://capstone-roomr.firebaseio.com',
  projectId: 'capstone-roomr',
  storageBucket: '',
  messagingSenderId: '759179201870',
  appId: '1:759179201870:web:c501209350a62fde'
};
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      possibleFriends: ['Allie', 'Gator', 'Lizzie'],
      currentFriends: []
    };
  }
  addFriend = index => {
    const { currentFriends, possibleFriends } = this.state;

    // Pull friend out of possibleFriends
    const addedFriend = possibleFriends.splice(index, 1);

    // And put friend in currentFriends
    currentFriends.push(addedFriend);

    // Finally, update our app state
    this.setState({
      currentFriends,
      possibleFriends
    });
  };

  // constructor() {
  //   super();
  //   this.state = {
  //     message: '',
  //     messages: []
  //   };
  //   this.addItem = this.addItem.bind(this);
  // }

  // async componentDidMount() {
  //   // const { data: apartments } = await axios.get(
  //   //   'https://bac0a002.ngrok.io/api/apartments'
  //   // );
  //   // console.log('TCL: App -> componentDidMount -> apartments', apartments);

  //   firebase
  //     .database()
  //     .ref()
  //     .child('messages')
  //     .once('value', snapshot => {
  //       const data = snapshot.val();
  //       if (snapshot.val()) {
  //         const initMessages = [];
  //         Object.keys(data).forEach(message =>
  //           initMessages.push(data[message])
  //         );
  //         this.setState({
  //           messages: initMessages
  //         });
  //       }
  //     });

  //   firebase
  //     .database()
  //     .ref()
  //     .child('messages')
  //     .on('child_added', snapshot => {
  //       const data = snapshot.val();
  //       if (data) {
  //         this.setState(prevState => ({
  //           messages: [data, ...prevState.messages]
  //         }));
  //       }
  //     });
  // }

  // addItem() {
  //   if (!this.state.message) return;

  //   const newMessage = firebase
  //     .database()
  //     .ref()
  //     .child('messages')
  //     .push();
  //   newMessage.set(this.state.message, () => this.setState({ message: '' }));
  // }
  render() {
    return (
      <Provider store={store}>
        <AppNavigator
          screenProps={{
            currentFriends: this.state.currentFriends,
            possibleFriends: this.state.possibleFriends,
            addFriend: this.addFriend
          }}
        />
      </Provider>

      // <View style={styles.container}>
      //   <Login />
      //   <View style={styles.msgBox}>
      //     <TextInput
      //       placeholder="Enter your message"
      //       value={this.state.message}
      //       onChangeText={text => this.setState({ message: text })}
      //       style={styles.txtInput}
      //     />
      //     <Button title="Send" onPress={this.addItem} />
      //   </View>
      //   <FlatList
      //     data={this.state.messages}
      //     renderItem={({ item }) => (
      //       <View style={styles.listItemContainer}>
      //         <Text style={styles.listItem}>{item}</Text>
      //       </View>
      //     )}
      //   />
      // </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#eee'
//     // marginTop: Constants.statusBarHeight
//   },
//   msgBox: {
//     flexDirection: 'row',
//     padding: 20,
//     backgroundColor: '#fff'
//   },
//   txtInput: {
//     flex: 1
//   },
//   listItemContainer: {
//     backgroundColor: '#fff',
//     margin: 5,
//     borderRadius: 5
//   },
//   listItem: {
//     fontSize: 20,
//     padding: 10
//   }
// });
