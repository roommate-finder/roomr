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
  onPress = async () => {
    this.props.navigation.navigate('Chatroom', {
      me: this.props.user,
      chatId: `chat${[chat.user1Id, this.props.user.id].sort()[0]}-${
        [chat.user2Id, this.props.user.id].sort()[1]
      }`
    });
  };

  _renderItem = ({ item }) => (
    <FlatList title={`${item.firstName}`} avatar={`${item.photo}`} />
  );
  render() {
    const props = this.props.navigation.state.params;

    return this.props.user &&
      this.props.user.chatrooms &&
      this.props.user.chatrooms.length
      ? this.props.user.chatrooms.map(chat => {
          return chat.user1Id === this.props.user.id ? (
            <View style={{ height: 65 }}>
              <FlatList
                data={[this.props.users[chat.user2Id]]}
                renderItem={({ item }) => (
                  <ListItem
                    key={item.id}
                    leftAvatar={{ source: { uri: item.photo } }}
                    onPress={async () => {
                      this.props.navigation.navigate('Chatroom', {
                        me: this.props.user,
                        other: this.props.users[chat.user2Id],
                        chatId: `chat${
                          [
                            this.props.users[chat.user1Id].id,
                            this.props.user.id
                          ].sort()[0]
                        }-${
                          [
                            this.props.users[chat.user2Id].id,
                            this.props.user.id
                          ].sort()[1]
                        }`
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
                )}
                ItemSeparatorComponent={this.renderSeparator}
              />
            </View>
          ) : (
            // <View>
            //   <Button
            //     onPress={async () => {
            //       //   await axios.get(`${ngrok}/api/users/createChatroom`);
            //       this.props.navigation.navigate('Chatroom', {
            //         me: this.props.user,
            //         chatId: `chat${
            //           [chat.user1Id, this.props.user.id].sort()[0]
            //         }-${[chat.user2Id, this.props.user.id].sort()[1]}`
            //       });
            //     }}
            //   >
            //     <Text
            //       style={{
            //         marginRight: 100
            //       }}
            //     >
            //       {this.props.users[chat.user2Id].firstName}
            //     </Text>
            //   </Button>
            //   </View>

            <Title>{this.props.users[chat.user1Id].firstName}</Title>
          );
          /* //     if (chat.user1Id === this.props.user.id) {
              //       <Title>{chat[0]}</Title>;
              //     } else {
              //       <Title>{chat.user1Id}</Title>;
              //     }
              console.log('THISPROPS', this.props.user);
              console.log('THISPROPSCHATROOM', this.props.user.chatrooms); */
        })
      : null;

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
