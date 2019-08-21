/* window */
import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback
} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Thumbnail,
  Grid,
  Col,
  Form,
  Item,
  Label,
  Input
} from 'native-base';
// import * as Font from 'expo-font';
import { connect } from 'react-redux';
import { setUserThunk } from '../store/user';
// import 'firebase/firestore';
// import { FirebaseWrapper } from '../../firebase/firebase';
import { firebaseConfig } from '../../firebase/config';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/admin';
firebase.initializeApp(firebaseConfig);
// import firebase from 'react-native-firebase';
// const auth = firebase.auth();
// const db = firebase.firestore();
//update firestore settings

// db.settings({ timestampsInSnapshots: true });

observeAuth = () => firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
class PhoneLogin extends React.Component {
  constructor() {
    super();
    this.state = { email: '', password: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.props.setUser(this.state);
    this.props.navigation.navigate('Home');
    admin
      .auth()
      .getUser(uid)
      .then(function(userRecord) {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log('Successfully fetched user data:', userRecord.toJSON());
      })
      .catch(function(error) {
        console.log('Error fetching user data:', error);
      });
    //   const { email, password } = this.state;
    //   firebase
    //     .auth()
    //     .signInWithEmailAndPassword(email, password)
    //     .then(() => this.props.navigation.navigate('Home'))
    //     .catch(error => this.setState({ errorMessage: error.message }));
    // }
  }
  render() {
    return (
      <View style={{ padding: 10 }}>
        <Form id="signup-form">
          <Item fixedLabel>
            <Label>Phone number</Label>
            <Input
              id="signup-phone"
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              value={this.state.phone}
              onChangeText={text => this.setState({ phone: text })}
            />
          </Item>
          <Item fixedLabel>
            <Label>Password</Label>
            <Input
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              value={this.state.password}
              onChangeText={text => this.setState({ password: text })}
            />
          </Item>
          <Button onPress={() => this.handleSubmit()}>
            <Text>Submit</Text>
          </Button>
        </Form>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUserThunk(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhoneLogin);
