// import React from "react";
// import { StyleSheet, Text, View, TextInput, Button, FlatList } from "react-native";
// //import { Container, Header, Title, Content, Footer, FooterTab, Left, Right, Body, Icon, Thumbnail, Grid, Col } from 'native-base';
// // import * as Font from 'expo-font';
import { connect } from 'react-redux'
// import { Constants } from 'expo';
// import * as firebase from 'firebase';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  Image
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import Messages from '../container/Messages';
import { Constants } from 'expo';
import moment from 'moment';
import firebaseApp from '../../firebase/config'

class Chatroom extends React.Component {
  constructor(props) {
    super(props);
    var FirebaseDB = firebaseApp.database();
    var roomKey = this.props.navigation.state.params.chatId;
    this.messagesRef = FirebaseDB.ref(`messages/${roomKey}`);
    this.state = {
      user: '',
      messages: []
    }
  }
  componentDidMount() {
    this.setState({ user: this.props.user });
    this.listenForMessages(this.messagesRef);
  }

  listenForMessages(messagesRef) {
    messagesRef.on('value', (dataSnapshot) => {
      var messagesFB = [];
      dataSnapshot.forEach((child) => {
        messagesFB = [({
          _id: child.key,
          text: child.val().text,
          createdAt: child.val().createdAt,
          user: {
            _id: child.val().user._id,
            name: child.val().user.name
          }
        }), ...messagesFB];
      });
      this.setState({ messages: messagesFB });
    });
  }

  addMessage(message = {}) {
    // var message = message[0]
    this.messagesRef.push({
      text: message[0].text,
      createdAt: Date.now(),
      user: {
        _id: message[0].user._id,
        name: message[0].user.name
      }
    })
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
            name: this.props.user.firstName,
          }}
        />
      </View>
    );
  }
}






// constructor(props) {
//   super(props)

//   this.state = {
//     message: '',
//     messages: []
//   }

//   this.addItem = this.addItem.bind(this);
// }

// componentDidMount() {
//   const props = this.props.navigation.state.params;
//   firebase
//     .database()
//     .ref()
//     .child(props.chatId)
//     .once("value", snapshot => {
//       const data = snapshot.val()
//       if (snapshot.val()) {
//         const initMessages = [];
//         Object
//           .keys(data)
//           .forEach(message => initMessages.push(data[message]));
//         this.setState({
//           messages: initMessages
//         })
//       }
//     });

//   firebase
//     .database()
//     .ref()
//     .child(props.chatId)
//     .on("child_added", snapshot => {
//       const data = snapshot.val();
//       if (data) {
//         this.setState(prevState => ({
//           messages: [...prevState.messages, data]
//         }))
//       }
//     })

// }

// addItem() {
//   const props = this.props.navigation.state.params;
//   if (!this.state.message) return;
//   let msg = {
//     message: this.state.message,
//     firstName: props.me.firstName,
//   };

//   const newMessage = firebase.database().ref()
//     .child(props.chatId)
//     .push();
//   newMessage.set(msg, () => this.setState({ message: '' }))
// }

// render() {
//   return (
//     <View style={styles.container}>
//       <View style={styles.msgBox}>
//         <TextInput placeholder='Enter your message'
//           value={this.state.message}
//           onChangeText={(text) => this.setState({ message: text })}
//           style={styles.txtInput} />
//         <Button title='Send' onPress={this.addItem} />
//       </View>
//       <FlatList data={this.state.messages}
//         renderItem={
//           ({ item }) =>
//             <View style={styles.listItemContainer}>
//               <Text style={styles.listItem}>
//                 {item.message} from {item.firstName}
//               </Text>
//             </View>
//         }
//       />
//     </View>
//   );
// }


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


// export default class Chatroom extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       message: '',
//       messages: []
//     };

//     this.sendMessage = this.sendMessage.bind(this);
//     this.findUsersInChat = this.findUsersInChat.bind(this);
//   }

//   componentDidMount() {
//     const props = this.props.navigation.state.params;
//     console.log('PROPS IN CDM', props);
//     firebase
//       .database()
//       .ref()
//       .child(props.chatId)
//       .once('value', snapshot => {
//         const data = snapshot.val();
//         if (snapshot.val()) {
//           const initMessages = [];
//           Object.keys(data).forEach(message =>
//             initMessages.push(data[message])
//           );
//           this.setState({
//             messages: initMessages
//           });
//         }
//       });

//     firebase
//       .database()
//       .ref()
//       .child(props.chatId)
//       .on('child_added', snapshot => {
//         const data = snapshot.val() || [];
//         if (data) {
//           this.setState(prevState => ({
//             messages: [data, ...prevState.messages]
//           }));
//         }
//       });
//   }
//   // findUsersInChat(mess) {
//   //   const userInChat = this.props.users.filter(user => user.id === mess);
//   //   return userInChat;
//   // }
//   //   updateMessage(event) {
//   //     this.setState({
//   //       message: event.target.value
//   //     });
//   //   }
//   // sendMessage() {
//   //   const props = this.props.navigation.state.params;
//   //   console.log('USSSSERRR', props.me);
//   //   if (!this.state.message) return;
//   //   let msg = {
//   //     message: this.state.message,
//   //     time: firebase.database.ServerValue.TIMESTAMP,
//   //     firstName: props.me.firstName,
//   //     photo: props.me.photo
//   //   };
//   //   const newMsgRef = firebase
//   //     .database()
//   //     .ref()
//   //     .child(props.chatId)
//   //     .push();
//   //   msg.id = newMsgRef.key;
//   //   newMsgRef.set(msg, () => this.setState({ message: '' }));
//   //   // newMessage.set(this.state.message, () => this.setState({ message: '' }));
//   //   // newMessage.set(this.state.avatar, () => this.setState({ avatar: '' }));
//   //   // newMessage.set(this.state.firstName, () =>
//   //   //   this.setState({ firstName: '' })
//   //   // );
//   // }

//   render() {
//     const props = this.props.navigation.state.params;
//     const messages = this.state.messages;
//     console.log('PROPSME', props.me);
//     return (
//       <View style={styles.container}>
//         <View style={styles.msgBox}>
//           {/* <TextInput
//             placeholder="Enter your message"
//             value={this.state.message}
//             onChangeText={text => this.setState({ message: text })}
//             style={styles.txtInput}
//           /> */}
//           <TextInput
//             placeholder="Enter your message"
//             onChangeText={text => this.setState({ message: text })}
//             value={this.state.message}
//             style={styles.txtInput}
//           />
//           <Button title="Send" onPress={this.sendMessage}>
//             Send message
//           </Button>
//           {/* <Button title="Send" onPress={this.addItem} /> */}
//         </View>
//         <View>
//           {/* <GiftedChat
//             messages={messages}
//             onSend={messages => this.sendMessage(messages)}
//             user={{
//               _id: props.me.id
//             }}
//           /> */}
//           {this.state.messages.map(msg => (
//             <View>
//               <Text>{msg.message}</Text>
//               <Text>{moment(msg.time).from(Date.now())}</Text>
//               <Text>{msg.firstName}</Text>
//               <Image src={msg.photo} />
//             </View>
//           ))}
//         </View>

//         {/* <FlatList
//         this.addItem = this.addItem.bind(this);
//     }

//     componentDidMount() {
//         const props = this.props.navigation.state.params;
//         console.log("PROPS IN CDM", props)
//         firebase
//             .database()
//             .ref()
//             .child(props.chatId)
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
//             .child(props.chatId)
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
//         const props = this.props.navigation.state.params;
//         if (!this.state.message) return;

//         const newMessage = firebase.database().ref()
//             .child(props.chatId)
//             .push();
//         newMessage.set(this.state.message, () => this.setState({ message: '' }))
//     }

//     render() {
//         return (
//             <View style={styles.container}>

//                 <View style={styles.msgBox}>
//                     <TextInput
//                         placeholder="Enter your message"
//                         value={this.state.message}
//                         onChangeText={text => this.setState({ message: text })}
//                         style={styles.txtInput}
//                     />
//                     <Button title="Send" onPress={this.addItem} />

//                 </View>
//                 <View>
//                     {this.state.messages.map(msg => <Text>{msg.message}</Text>)}

//                 </View>




//                 {/* <FlatList
//                     data={this.state.messages}
//                     renderItem={({ item }) => (
//                         <View style={styles.listItemContainer}>
//                             <Text style={styles.listItem}>{item}</Text>
//                         </View>
//                     )}
//                 /> */}
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#eee'
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
// // class Chatroom extends React.Component {
// //     constructor(props) {
// //         super(props)

// //         this.state = {
// //             message: '',
// //             messages: []
// //         }

// //         this.addItem = this.addItem.bind(this);
// //     }

// //     componentDidMount() {
// //         firebase
// //             .database()
// //             .ref()
// //             .child("messages")
// //             .once("value", snapshot => {
// //                 const data = snapshot.val()
// //                 if (snapshot.val()) {
// //                     const initMessages = [];
// //                     Object
// //                         .keys(data)
// //                         .forEach(message => initMessages.push(data[message]));
// //                     this.setState({
// //                         messages: initMessages
// //                     })
// //                 }
// //             });

// //         firebase
// //             .database()
// //             .ref()
// //             .child("messages")
// //             .on("child_added", snapshot => {
// //                 const data = snapshot.val();
// //                 if (data) {
// //                     this.setState(prevState => ({
// //                         messages: [data, ...prevState.messages]
// //                     }))
// //                 }
// //             })

// //     }

// //     addItem() {
// //         if (!this.state.message) return;

// //         const newMessage = firebase.database().ref()
// //             .child("messages")
// //             .push();
// //         newMessage.set(this.state.message, () => this.setState({ message: '' }))
// //     }

// //     render() {
// //         const props = this.props.navigation.state.params;

// //         return (

// //             /* <Text>CHAT ROOM</Text>
// //                 <Text>CURRENT USER :{props.me.firstName}</Text>
// //                 <Text>PERSON THAT {props.me.firstName} is talking to: {props.other.firstName} </Text>
// //                 <Text>
// //                     PERSON 1: {props.userIds[0]}
// //                     PERSON 2: {props.userIds[1]}
// //                 </Text> */
// //             < View style={styles.container} >
// //                 <View style={styles.msgBox}>
// //                     <TextInput placeholder='Enter your message'
// //                         value={this.state.message}
// //                         onChangeText={(text) => this.setState({ message: text })}
// //                         style={styles.txtInput} />
// //                     <Button title='Send' onPress={this.addItem} />
// //                 </View>
// //                 <FlatList data={this.state.messages}
// //                     renderItem={
// //                         ({ item }) =>
// //                             <View style={styles.listItemContainer}>
// //                                 <Text style={styles.listItem}>
// //                                     {item}
// //                                 </Text>
// //                             </View>
// //                     }
// //                 />
// //             </View >

// //         );
// //     }
// // }

// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         backgroundColor: '#eee'
// //     },
// //     msgBox: {
// //         flexDirection: 'row',
// //         padding: 20,
// //         backgroundColor: '#fff'
// //     },
// //     txtInput: {
// //         flex: 1
// //     },
// //     listItemContainer: {
// //         backgroundColor: '#fff',
// //         margin: 5,
// //         borderRadius: 5
// //     },
// //     listItem: {
// //         fontSize: 20,
// //         padding: 10
// //     }
// // });
