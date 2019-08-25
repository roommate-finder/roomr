import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
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
import { connect } from 'react-redux';
import { createUserThunk, setUserThunk } from '../store/user';

class PhoneLogin extends React.Component {
  constructor() {
    super();
    this.state = { phone: '', password: '', firstName: '', lastName: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.props.createUser(this.state);
    this.props.navigation.navigate('EditProfile');
  }
  render() {
    return (
      <View style={{ padding: 10 }}>
        <Form>
          <Item fixedLabel>
            <Label>Phone number</Label>
            <Input
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
          <Button
            style={{ backgroundColor: '#0e677c', marginTop: 10 }}
            onPress={() => this.handleSubmit()}
          >
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
  createUser: user => dispatch(createUserThunk(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhoneLogin);
