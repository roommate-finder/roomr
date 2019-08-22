import React, { Component } from 'react';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Text,
  Icon,
  StyleProvider
} from 'native-base';
import * as Font from 'expo-font';
import { StyleSheet, View, Button } from 'react-native';

export default class HomeScreen extends Component {
  render() {
    return (
      <Container
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#0e677c'
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 100
          }}
        >
          <Text style={{ fontSize: 30, color: 'white' }}>ROOMR</Text>
          <Icon type="FontAwesome" name="home" style={{ color: 'white' }} />
        </View>
        <View>
          <View
            style={{
              backgroundColor: 'white',
              marginBottom: 10,
              borderRadius: 10
            }}
          >
            <Button
              color="#0e677c"
              title="Phone login"
              onPress={() => this.props.navigation.navigate('PhoneLogin')}
            >
              <Text>Phone login</Text>
            </Button>
          </View>
          <View style={{ backgroundColor: 'white', borderRadius: 10 }}>
            <Button
              color="#0e677c"
              title="Signup"
              onPress={() => this.props.navigation.navigate('Signup')}
            >
              <Text>Signup</Text>
            </Button>
          </View>
        </View>
      </Container>
    );
  }
}
