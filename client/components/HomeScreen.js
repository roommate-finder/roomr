import React, { Component } from 'react';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text
} from 'native-base';
import { StyleSheet, View } from 'react-native';

export default class HomeScreen extends Component {
  render() {
    return (
      <Container style={{ justifyContent: 'center', alignContent: 'center' }}>
        <View style={{ justifyContent: 'center', alignContent: 'center' }}>
          <Text>ROOMR</Text>
        </View>
        <Button
          title="Phone login"
          onPress={() => this.props.navigation.navigate('PhoneLogin')}
        >
          <Text>Phone login</Text>
        </Button>
        <Button>
          <Text>Signup</Text>
        </Button>
      </Container>
    );
  }
}
