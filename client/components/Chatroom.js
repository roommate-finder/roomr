// import React from "react";
// import { StyleSheet, Text, View, TextInput, Button, FlatList } from "react-native";
// //import { Container, Header, Title, Content, Footer, FooterTab, Left, Right, Body, Icon, Thumbnail, Grid, Col } from 'native-base';
// // import * as Font from 'expo-font';
// import { connect } from 'react-redux'
// import { Constants } from 'expo';
// import * as firebase from 'firebase';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import Messages from '../container/Messages';
import { Constants } from 'expo';
import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyCK-JUgjVNvI71cYKKKQzJQEURX3DFFnqI',
  authDomain: 'capstone-roomr.firebaseapp.com',
  databaseURL: 'https://capstone-roomr.firebaseio.com',
  projectId: 'capstone-roomr',
  storageBucket: '',
  messagingSenderId: '759179201870',
  appId: '1:759179201870:web:c501209350a62fde'
};

export default class Chatroom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      messages: []
    };

    this.sendMessage = this.sendMessage.bind(this);
    this.findUsersInChat = this.findUsersInChat.bind(this);
  }

  componentDidMount() {
    const props = this.props.navigation.state.params;
    console.log('PROPS IN CDM', props);
    firebase
      .database()
      .ref()
      .child(props.chatId)
      .once('value', snapshot => {
        const data = snapshot.val();
        if (snapshot.val()) {
          const initMessages = [];
          Object.keys(data).forEach(message =>
            initMessages.push(data[message])
          );
          this.setState({
            messages: initMessages
          });
        }
      });

    firebase
      .database()
      .ref()
      .child(props.chatId)
      .on('child_added', snapshot => {
        const data = snapshot.val();
        if (data) {
          this.setState(prevState => ({
            messages: [data, ...prevState.messages]
          }));
        }
      });
  }
  findUsersInChat(mess) {
    const userInChat = this.props.users.filter(user => user.id === mess);
    return userInChat;
  }
  //   updateMessage(event) {
  //     this.setState({
  //       message: event.target.value
  //     });
  //   }
  sendMessage() {
    const props = this.props.navigation.state.params;
    if (!this.state.message) return;

    firebase
      .database()
      .ref()
      .child(props.chatId)
      .push({
        message: this.state.message,
        userId: this.state.userId,
        timestamp: Date.now()
      });
    this.setState({ message: '' });
    // newMessage.set(this.state.message, () => this.setState({ message: '' }));
    // newMessage.set(this.state.avatar, () => this.setState({ avatar: '' }));
    // newMessage.set(this.state.firstName, () =>
    //   this.setState({ firstName: '' })
    // );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.msgBox}>
          {/* <TextInput
            placeholder="Enter your message"
            value={this.state.message}
            onChangeText={text => this.setState({ message: text })}
            style={styles.txtInput}
          /> */}
          <TextInput
            placeholder="Enter your message"
            onChangeText={text => this.setState({ message: text })}
            value={this.state.message}
            type="text"
          />
          <Button title="Send" onClick={this.sendMessage}>
            Send message
          </Button>
          {/* <Button title="Send" onPress={this.addItem} /> */}
        </View>
        <View>
          {this.state.messages.map((msg, id) => (
            <View>
              <Text>{msg.text}</Text>
              <Text>{msg.timestamp}</Text>
            </View>
          ))}
        </View>

        {/* <FlatList
                    data={this.state.messages}
                    renderItem={({ item }) => (
                        <View style={styles.listItemContainer}>
                            <Text style={styles.listItem}>{item}</Text>
                        </View>
                    )}
                /> */}
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
// class Chatroom extends React.Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//             message: '',
//             messages: []
//         }

//         this.addItem = this.addItem.bind(this);
//     }

//     componentDidMount() {
//         firebase
//             .database()
//             .ref()
//             .child("messages")
//             .once("value", snapshot => {
//                 const data = snapshot.val()
//                 if (snapshot.val()) {
//                     const initMessages = [];
//                     Object
//                         .keys(data)
//                         .forEach(message => initMessages.push(data[message]));
//                     this.setState({
//                         messages: initMessages
//                     })
//                 }
//             });

//         firebase
//             .database()
//             .ref()
//             .child("messages")
//             .on("child_added", snapshot => {
//                 const data = snapshot.val();
//                 if (data) {
//                     this.setState(prevState => ({
//                         messages: [data, ...prevState.messages]
//                     }))
//                 }
//             })

//     }

//     addItem() {
//         if (!this.state.message) return;

//         const newMessage = firebase.database().ref()
//             .child("messages")
//             .push();
//         newMessage.set(this.state.message, () => this.setState({ message: '' }))
//     }

//     render() {
//         const props = this.props.navigation.state.params;

//         return (

//             /* <Text>CHAT ROOM</Text>
//                 <Text>CURRENT USER :{props.me.firstName}</Text>
//                 <Text>PERSON THAT {props.me.firstName} is talking to: {props.other.firstName} </Text>
//                 <Text>
//                     PERSON 1: {props.userIds[0]}
//                     PERSON 2: {props.userIds[1]}
//                 </Text> */
//             < View style={styles.container} >
//                 <View style={styles.msgBox}>
//                     <TextInput placeholder='Enter your message'
//                         value={this.state.message}
//                         onChangeText={(text) => this.setState({ message: text })}
//                         style={styles.txtInput} />
//                     <Button title='Send' onPress={this.addItem} />
//                 </View>
//                 <FlatList data={this.state.messages}
//                     renderItem={
//                         ({ item }) =>
//                             <View style={styles.listItemContainer}>
//                                 <Text style={styles.listItem}>
//                                     {item}
//                                 </Text>
//                             </View>
//                     }
//                 />
//             </View >

//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#eee'
//     },
//     msgBox: {
//         flexDirection: 'row',
//         padding: 20,
//         backgroundColor: '#fff'
//     },
//     txtInput: {
//         flex: 1
//     },
//     listItemContainer: {
//         backgroundColor: '#fff',
//         margin: 5,
//         borderRadius: 5
//     },
//     listItem: {
//         fontSize: 20,
//         padding: 10
//     }
// });
// const mapStateToProps = state => {
//     return {
//         user: state.user,
//         feed: state.feed,
//         apartments: state.apartments,
//         users: state.users
//     };
// };

// const mapDispatchToProps = dispatch => ({
//     getFeedData: user => dispatch(getFeedDataThunk(user)),
//     getApartments: () => dispatch(getApartmentsThunk()),
//     getUsers: () => dispatch(getUsersThunk())
// });

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Chatroom);
