import React from 'react';
import { Font, AppLoading } from 'expo';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Constants } from 'expo';
import * as firebase from 'firebase';
import 'firebase/firestore';
import axios from 'axios';
import AllMessages from './components/AllMessages';
import AppNavigator from './AppNavigator';

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
      currentFriends: [],
      fontsAreLoaded: false
    };
  }
  async componentWillMount() {
    await Font.loadAsync({
      'Rubik-Black': require('./node_modules/@shoutem/ui/fonts/Rubik-Black.ttf'),
      'Rubik-BlackItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-BlackItalic.ttf'),
      'Rubik-Bold': require('./node_modules/@shoutem/ui/fonts/Rubik-Bold.ttf'),
      'Rubik-BoldItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-BoldItalic.ttf'),
      'Rubik-Italic': require('./node_modules/@shoutem/ui/fonts/Rubik-Italic.ttf'),
      'Rubik-Light': require('./node_modules/@shoutem/ui/fonts/Rubik-Light.ttf'),
      'Rubik-LightItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-LightItalic.ttf'),
      'Rubik-Medium': require('./node_modules/@shoutem/ui/fonts/Rubik-Medium.ttf'),
      'Rubik-MediumItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-MediumItalic.ttf'),
      'Rubik-Regular': require('./node_modules/@shoutem/ui/fonts/Rubik-Regular.ttf'),
      'rubicon-icon-font': require('./node_modules/@shoutem/ui/fonts/rubicon-icon-font.ttf')
    });

    this.setState({ fontsAreLoaded: true });
  }
  addFriend = index => {
    const { currentFriends, possibleFriends } = this.state;

    // async componentDidMount() {
    // const { data: apartments } = await axios.get(
    //   'http://1f161a02.ngrok.io/api/apartments'
    // );
    // console.log('TCL: App -> componentDidMount -> apartments', apartments);
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
    if (!this.state.fontsAreLoaded) {
      return <AppLoading />;
    }
    return (
      // <View style={styles.container}>

      /* <View style={styles.msgBox}>
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
        /> */
      // </View>
      <AppNavigator
        screenProps={{
          currentFriends: this.state.currentFriends,
          possibleFriends: this.state.possibleFriends,
          addFriend: this.addFriend
        }}
      />

      // <View style={styles.container}>
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
