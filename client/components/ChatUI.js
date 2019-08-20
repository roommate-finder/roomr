import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ReactNative, FlatList } from 'react-native';
import Input from '../containers/Input';
import { View, Title, Screen } from '@shoutem/ui';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Messages from '../containers/Messages';
import { sendMessage } from '../actions';
// import { FirebaseWrapper } from '../../firebase/firebase';
import { firebaseConfig } from '../../firebase/config';
import * as firebase from 'firebase';
firebase.initializeApp(firebaseConfig);
const mapStateToProps = state => ({
  chatHeight: state.chatroom.meta.height,
  user: state.user
});

class ChatUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollViewHeight: 0,
      inputHeight: 0,
      text: '',
      messages: []
    };
  }

  componentDidMount() {
    try {
      firebase
        .database()
        .ref()
        .child('messages')
        .once('value', snapshot => {
          const data = snapshot.val();
          if (snapshot.val()) {
            const initMessages = [];
            Object.keys(data).forEach(message => {
              console.log('DATA', data);
              initMessages.push(data[message]);
            });

            this.setState({
              messages: initMessages
            });
            console.log('INIT2', this.state);
          }
        });
      console.log('End of try');
    } catch (err) {
      console.log("There's an err", err);
    }

    // firebase
    //   .database()
    //   .ref()
    //   .child('messages')
    //   .on('child_added', snapshot => {
    //     const data = snapshot.val();
    //     if (data) {
    //       this.setState(prevState => ({
    //         messages: [data, ...prevState.messages]
    //       }));
    //     }
    //   });
    console.log('MESSAGES', this.state.messages);
    this.scrollToBottom(false);
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }
  onScrollViewLayout = event => {
    const layout = event.nativeEvent.layout;

    this.setState({
      scrollViewHeight: layout.height
    });
  };
  onInputLayout = event => {
    const layout = event.nativeEvent.layout;
    this.setState({
      inputHeight: layout.height
    });
  };
  scrollToBottom(animate = true) {
    const { scrollViewHeight, inputHeight } = this.state,
      { chatHeight } = this.props;

    const scrollTo = chatHeight - scrollViewHeight + inputHeight;

    if (scrollTo > 0) {
      this.refs.scroll.scrollToPosition(0, scrollTo, animate);
    }
  }
  //   _scrollToInput(reactRef) {
  //     this.refs.scroll.scrollToFocusedInput(ReactNative.findNodeHandle(reactRef));
  //   }
  //text
  async sendMessage(text) {
    try {
      //   console.log('Hey mamacita', this.state.text)
      // make call to Firebase
      console.log('HEY THERE', text);
      const newMsgRef = firebase
        .database()
        .ref('messages')
        .push();
      //   msg.id = newMsgRef.key;
      newMsgRef.set(text);
      //   await FirebaseWrapper.GetInstance().CreateNewDocument('messages', {
      //     text: text
      //   });

      //   this.props.closeModal();
    } catch (error) {
      console.log('something went wrong with the post:', error);
    }

    // return sendMessage(text, this.props.user);
  }

  render() {
    console.log('MESSAGES IN RENDER', this.state.messages);
    return (
      <Screen>
        <Title>Global ChatRoom</Title>

        <KeyboardAwareScrollView
          ref="scroll"
          onLayout={this.onScrollViewLayout}
        >
          <Messages />
          {/* <Messages
            data={this.state.messages}
            renderItem={({ item }) => (
              <View style={styles.listItemContainer}>
                <Text style={styles.listItem}>{item}</Text>
              </View>
            )}
          /> */}

          <Input
            onLayout={this.onInputLayout}
            // onFocus={this._scrollToInput.bind(this)}
            submitAction={this.sendMessage}
            ref="input"
            placeholder="Type a message"
          />
        </KeyboardAwareScrollView>
      </Screen>
    );
  }
}

export default connect(mapStateToProps)(ChatUI);

// import React, { Component } from 'react';
// import { Examples } from '@shoutem/ui';

// export default class App extends Component {
//   render() {
//     return <Examples />;
//   }
// }
