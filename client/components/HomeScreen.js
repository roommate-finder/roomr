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

import { View, Button } from 'react-native';

export default class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  };

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
            alignItems: 'center',
            marginBottom: 100
          }}
        >
          <Text style={{ fontSize: 55, color: 'white' }}>roomr </Text>
          <Icon
            type="FontAwesome"
            name="home"
            style={{ color: 'white', fontSize: 60 }}
          />
        </View>
        <View>
          <View
            style={{
              backgroundColor: 'white',
              marginBottom: 20,
              borderRadius: 10,
              width: 125
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
          <View
            style={{ backgroundColor: 'white', borderRadius: 10, width: 125 }}
          >
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
