import React, { Component } from 'react';
import { View } from 'react-native';

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
import { updateUserThunk } from '../store/user';
import { connect } from 'react-redux';
class EditProfile extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Edit Profile'
    };
  };

  constructor() {
    super();
    this.state = {
      bio: '',
      job: ''
    };
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave() {
    this.props.updateUser({
      id: this.props.user.id,
      bio: this.state.bio,
      job: this.state.job
    });
    this.props.navigation.navigate('UserProfile');
    this.setState({
      bio: '',
      job: ''
    });
  }

  componentDidMount() {
    const user = this.props.user;

    this.setState({
      bio: user.bio,
      job: user.job
    });
  }
  componentDidUpdate(prevProps) {
    const user = this.props.user;
    if (prevProps.user !== user) {
      this.setState({
        bio: user.bio,
        job: user.job
      });
    }
  }

  render() {
    return (
      <View style={{ padding: 10 }}>
        <Form>
          <Item fixedLabel>
            <Label>Bio</Label>
            <Input
              multiline={true}
              numberOfLines={4}
              value={this.state.bio}
              onChangeText={bio => this.setState({ bio })}
            />
          </Item>
          <Item fixedLabel>
            <Label>Job Title</Label>
            <Input
              value={this.state.job}
              onChangeText={job => this.setState({ job })}
            />
          </Item>
        </Form>
        <Button
          style={{ backgroundColor: '#0e677c', marginTop: 10 }}
          onPress={() => this.handleSave()}
        >
          <Text style={{ color: '#FFF' }}> Save</Text>
        </Button>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => ({
  updateUser: user => dispatch(updateUserThunk(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile);
