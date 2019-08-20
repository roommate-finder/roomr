import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'native-base';
import * as Facebook from 'expo-facebook';
// import { FirebaseWrapper } from '../../firebase/firebase';
import { firebaseConfig } from '../../firebase/config';
// import * as firebase from 'firebase';
// import 'firebase/firestore';
// const firebaseConfig = {
//   // ADD YOUR FIREBASE CREDENTIALS
//   apiKey: 'AIzaSyCK-JUgjVNvI71cYKKKQzJQEURX3DFFnqI',
//   authDomain: 'capstone-roomr.firebaseapp.com',
//   databaseURL: 'https://capstone-roomr.firebaseio.com',
//   projectId: 'capstone-roomr',
//   storageBucket: ''
// };

// firebase.initializeApp(firebaseConfig);

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user !== null) {
        console.log('user:', user);
      }
    });
  }
  async loginWithFacebook() {
    //ENTER YOUR APP ID
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        '497447164323797', // app id
        { permissions: ['public_profile'] }
      );

      console.log('TCL: Login -> loginWithFacebook -> type', type);
      console.log('TCL: Login -> loginWithFacebook -> token', token);

      if (type == 'success') {
        //build firebase credentials with facebook access token we receive
        const credential = firebase.auth.FacebookAuthProvider.credential(token);

        firebase
          .auth()
          .signInWithCredential(credential)
          .catch(error => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <View>
        <Button
          onPress={() => this.loginWithFacebook()}
          style={{ marginTop: 10 }}
          title="Login with Facebook"
          color="green"
          accessibilityLabel="Learn more about this purple button"
        >
          <Text>Login With Facebook</Text>
        </Button>
      </View>
    );
  }
}

// FirebaseWrapper.GetInstance().Initialize(firebaseConfig);
