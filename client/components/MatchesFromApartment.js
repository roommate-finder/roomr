import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Modal,
  TouchableHighlight,
  Alert
} from 'react-native';
import {
  Container,
  Header,
  Button,
  Text,
  Content,
  Thumbnail,
  Card,
  CardItem,
  Body,
  Left,
  Icon,
  Right,
  Accordion
} from 'native-base';
import { getFeedDataThunk } from '../store/feed';
import { getApartmentsThunk } from '../store/apartments';
import { getUsersThunk } from '../store/users';
import { createUserChatroomThunk } from '../store/users';
import { connect } from 'react-redux';
import * as Font from 'expo-font';

class Feed extends React.Component {
  constructor() {
    super();
    this.findUserInStore = this.findUserInStore.bind(this);
    this.compare = this.compare.bind(this);
  }

  componentDidMount() {
    this.props.getUsers();
  }

  findUserInStore(match) {
    const userInStore = this.props.users.filter(user => user.id === match);
    // console.log('---------------- USER IN STORE', userInStore)
    return userInStore;
  }

  compare(a, b) {
    let comparison = 0;
    if (a.id < b.id) {
      comparison = -1;
    } else {
      comparison = 1;
    }
    return comparison;
  }

  // goToChat() {
  //     // to be called when you click on the message icon
  //     // grab the two ids: user id and person who you clicked on's id
  //     // look in the chat table to get id. if that combo doesnt exist, create a new row and return the id
  //     // pass that chat id into the Chatroom's props. also could pass through objects for the two people in the conversation
  // }

  render() {
    const props = this.props.navigation.state.params;
    return (
      <ScrollView>
        <Text>Matches for {props.apartment.name}</Text>
        {props.matchIds.map(id => (
          <Card>
            <CardItem>
              <Left>
                <Body>
                  <Text>
                    {this.findUserInStore(Number(id))[0].firstName}{' '}
                    {this.findUserInStore(Number(id))[0].lastName}
                  </Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image
                source={{ uri: this.findUserInStore(Number(id))[0].photo }}
                style={{ height: 200, width: null, flex: 1 }}
              />
            </CardItem>
            <CardItem>
              <Text>{this.findUserInStore(Number(id))[0].bio} </Text>
              <Button
                onSubmit={() => this.props.createUserChatroomThunk(user.id)}
                onPress={() =>
                  this.props.navigation.navigate('Chatroom', {
                    me: this.props.user,
                    other: this.findUserInStore(Number(id))[0],
                    chatId: `chat${[id, this.props.user.id].sort()[0]}-${
                      [id, this.props.user.id].sort()[1]
                    }`
                  })
                }
              >
                <Icon type="FontAwesome" name="comments" />
              </Button>
            </CardItem>
          </Card>
        ))}
      </ScrollView>
    );
  }
}

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
  getUsers: () => dispatch(getUsersThunk()),
  createUserChatroomThunk: userId => dispatch(createUserChatroomThunk(userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);
