import React from 'react';
import { ScrollView, FlatList, View } from 'react-native';
import {
  Container,
  Text,
  Header,
  Title,
  Left,
  Input,
  InputGroup,
  Button,
  Icon
} from 'native-base';
import { ListItem } from 'react-native-elements';
import Chatroom from './Chatroom';
import { getUserChatroomThunk } from '../store/user';
import MatchesFromApartment from './MatchesFromApartment';
import { connect } from 'react-redux';
import axios from 'axios';
import { ngrok } from '../../client/store';
import getOtherUser from '../util/getOtherUser';

class AllMessages extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Button transparent onPress={() => navigation.navigate('UserProfile')}>
          <Icon type="FontAwesome" name="user" style={{ color: 'grey' }} />
        </Button>
      ),
      headerTitle: (
        <View style={{ flexDirection: 'row' }}>
          <Button
            style={{ marginRight: 55 }}
            transparent
            onPress={() => navigation.navigate('ApartmentSwipe')}
          >
            <Icon
              type="FontAwesome"
              name="home"
              style={{ color: 'grey', fontSize: 30 }}
            />
          </Button>
          <Button transparent>
            <Icon
              type="FontAwesome"
              name="heart"
              style={{ color: 'grey' }}
              onPress={() => navigation.navigate('Feed')}
            />
          </Button>
        </View>
      ),

      headerRight: (
        <Button
          transparent
          style={{ marginBottom: 4 }}
          // onPress={() => navigation.navigate('AllMessages')}
        >
          <Icon
            type="FontAwesome"
            name="comments"
            style={{ color: '#0e677c', fontSize: 30 }}
          />
        </Button>
      )
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      messages: [],
      refreshing: false
    };
    this.findUserInStore = this.findUserInStore.bind(this);
    this.onPress = this.onPress.bind(this);
  }

  async componentDidMount() {
    await this.props.getUserChatroomThunk(this.props.user.id);
  }

  findUserInStore(match) {
    const userInStore = this.props.users.filter(user => user.id === match);
    // console.log('---------------- USER IN STORE', userInStore)
    return userInStore;
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%'
        }}
      />
    );
  };

  _renderItem = ({ item }) => (
    <FlatList title={`${item.firstName}`} avatar={`${item.photo}`} />
  );
  render() {
    const props = this.props.navigation.state.params;
    console.log('PROPSUSER', this.props);
    if (!this.props.user) {
      console.log('HERE NO USER');
      return (
        <View>
          <Text>Sorry no messages yet</Text>
        </View>
      );
    } else if (!this.props.user.chatrooms) {
      console.log('HERE NO CHATS');
      return (
        <View>
          <Text>Sorry no messages yet</Text>
        </View>
      );
    } else {
      return this.props.user.chatrooms.map(chat => {
        console.log('HERE I AM', this.props.users[chat.user1Id - 1]);
        console.log('CHAT1', chat.user1Id);
        console.log('CHAT', chat);
        if (chat.user1Id !== this.props.user.id)
          return (
            <View style={{ height: 65 }}>
              <FlatList
                data={[this.props.users[chat.user1Id - 1]]}
                renderItem={({ item }) => {
                  console.log('ITEM', item);
                  return (
                    <ListItem
                      key={item.id}
                      leftAvatar={{ source: { uri: item.photo } }}
                      onPress={async () => {
                        this.props.navigation.navigate('Chatroom', {
                          me: this.props.user,
                          other: getOtherUser(
                            this.props.users,
                            this.props.user,
                            chat
                          ),
                          chatId: `chat${
                            this.props.users[chat.user1Id - 1].id
                          }-${this.props.users[chat.user2Id - 1].id}`
                        });
                      }}
                      title={
                        <Text style={{ fontWeight: 'bold' }}>
                          {item.firstName}
                        </Text>
                      }
                      subtitle={
                        <Text style={{ color: '#A0A0A0' }}>{item.bio}</Text>
                      }
                      chevron={true}
                      topDivider={true}
                      bottomDivider={true}
                    />
                  );
                }}
                ItemSeparatorComponent={this.renderSeparator}
              />
            </View>
          );
        else {
          return (
            <View style={{ height: 65 }}>
              <FlatList
                data={[this.props.users[chat.user2Id - 1]]}
                renderItem={({ item }) => {
                  console.log('ITEM2', item);
                  return (
                    <ListItem
                      key={item.id}
                      leftAvatar={{ source: { uri: item.photo } }}
                      onPress={async () => {
                        this.props.navigation.navigate('Chatroom', {
                          me: this.props.user,
                          other: getOtherUser(
                            this.props.users,
                            this.props.user,
                            chat
                          ),
                          chatId: `chat${
                            this.props.users[chat.user1Id - 1].id
                          }-${this.props.users[chat.user2Id - 1].id}`
                        });
                      }}
                      title={
                        <Text style={{ fontWeight: 'bold' }}>
                          {item.firstName}
                        </Text>
                      }
                      subtitle={
                        <Text style={{ color: '#A0A0A0' }}>{item.bio}</Text>
                      }
                      chevron={true}
                      topDivider={true}
                      bottomDivider={true}
                    />
                  );
                }}
                ItemSeparatorComponent={this.renderSeparator}
              />
            </View>
          );
        }
      });
    }

    //   return this.props.user.chatrooms.map(chat => {
    //     <Text>Hello</Text>;
    //       <ScrollView>

    //       </ScrollView>
    //   });
  }
}

const mapState = state => {
  return {
    user: state.user,
    feed: state.feed,
    MatchesFromApartment: state.MatchesFromApartment,
    users: state.users
  };
};

const mapDispatch = dispatch => {
  return {
    getUserChatroomThunk: userId => dispatch(getUserChatroomThunk(userId))
  };
};
export default connect(
  mapState,
  mapDispatch
)(AllMessages);
