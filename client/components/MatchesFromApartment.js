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
import axios from 'axios';
import { ngrok } from '../../client/store';
import { LinearGradient } from 'expo-linear-gradient';

class MatchesFromApartment extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {

      headerTitle: (
        <View style={{ flexDirection: 'row' }}>
          <Text>{navigation.state.params.apartment.name} Matches</Text>
        </View>
      ),


    };
  };
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

  async sendTextNotification(user1, user2, apartmentName) {
    if (
      (user1.firstName === 'Cody' && user2.firstName === 'Joey') ||
      (user1.firstName === 'Joey' && user2.firstName === 'Cody')
    ) {
      const { data } = await axios.post(`${ngrok}/api/twilio/`, {
        user1: user1,
        user2: user2,
        apartmentName: apartmentName
      });
    }
  }

  // goToChat() {
  //     // to be called when you click on the message icon
  //     // grab the two ids: user id and person who you clicked on's id
  //     // look in the chat table to get id. if that combo doesnt exist, create a new row and return the id
  //     // pass that chat id into the Chatroom's props. also could pass through objects for the two people in the conversation
  // }

  render() {
    const props = this.props.navigation.state.params;
    const styles = StyleSheet.create({
      overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,255,0.5)'
      }
    });

    return (
      <ScrollView>

        {props.matchIds.map(id => (
          <Card style={{ flexDirection: 'row' }}>
            <CardItem>
              <Image
                source={{ uri: this.findUserInStore(Number(id))[0].photo }}
                style={{ height: 150, width: 150 }}
              />
            </CardItem>
            <CardItem style={{ flexDirection: 'column', marginTop: 30 }}>
              <Text style={{ textAlign: 'right' }}>{this.findUserInStore(Number(id))[0].firstName} {this.findUserInStore(Number(id))[0].lastName}, {this.findUserInStore(Number(id))[0].age}</Text>
              <Text>{this.findUserInStore(Number(id))[0].job}</Text>
              <Text> </Text>

              <Text>{this.findUserInStore(Number(id))[0].bio} </Text>
              <Button
                transparent
                colors={['#0000FF', '#008080']}
                // style={{
                //   left: 80,
                //   marginTop: 30
                // }}
                // onSubmit={() => this.props.createUserChatroomThunk(user.id)}
                onPress={async () => {
                  console.log('ID', id);
                  console.log('PROPSID', this.props.user.id);
                  const response = await axios.post(
                    `${ngrok}/api/users/createChatroom`,
                    {
                      user1Id: this.props.user.id,
                      user2Id: id
                    }
                  );
                  const chatroom = response.data;
                  this.sendTextNotification(
                    this.props.user,
                    this.findUserInStore(Number(id))[0],
                    props.apartment.name
                  ); // send user 1 and 2 to axios req
                  if (this.props.user.id === chatroom.user1Id) {
                    this.props.navigation.navigate('Chatroom', {
                      me: this.props.user,
                      other: this.findUserInStore(chatroom.user2Id),
                      chatId: `chat${chatroom.user1Id}-${chatroom.user2Id}`
                    });
                  } else {
                    this.props.navigation.navigate('Chatroom', {
                      me: this.props.user,
                      other: this.findUserInStore(chatroom.user1Id),
                      chatId: `chat${chatroom.user1Id}-${chatroom.user2Id}`
                    });
                  }
                }}
              >
                <Icon
                  type="FontAwesome"
                  name="comments"
                /></Button>
            </CardItem>
          </Card>
          // eslint-disable-next-line react/jsx-key
          // <Card style={{
          //   flexDirection: 'row',
          //   // justifyContent: 'space-around',
          //   // alignItems: 'center',
          //   // marginTop: 20
          // }} >
          //   <CardItem cardbody>
          //     <Image
          //       source={{ uri: this.findUserInStore(Number(id))[0].photo }}
          //       style={{ height: 100, width: 100, flex: 1 }}
          //     />
          //   </CardItem>
          //   <CardItem>
          //     <Text>
          //       {this.findUserInStore(Number(id))[0].firstName}{' '}
          //       {this.findUserInStore(Number(id))[0].lastName}
          //     </Text>
          //   </CardItem>

          // </Card>
          // <Card key={this.findUserInStore(Number(id))[0].id}>
          //   <CardItem>
          //     <Left>
          //       <Body>
          //         <Header style={{ backgroundColor: 'white', maxWidth: 2000 }}>
          //           <Text style={{ left: -120, fontWeight: 'bold' }}>
          //             {this.findUserInStore(Number(id))[0].firstName}{' '}
          //             {this.findUserInStore(Number(id))[0].lastName}
          //           </Text>
          //         </Header>
          //       </Body>
          //     </Left>
          //   </CardItem>
          //   <CardItem cardBody style={{ height: 300 }}>
          //     <View style={styles.overlay}>
          //       <Image
          //         source={{ uri: this.findUserInStore(Number(id))[0].photo }}
          //         style={{
          //           height: 320,
          //           width: null,
          //           flex: 1
          //         }}
          //       />
          //     </View>
          //   </CardItem>

          //   <CardItem>
          //     <Text>{this.findUserInStore(Number(id))[0].bio} </Text>

          //     <Button
          //       colors={['#0000FF', '#008080']}
          //       style={{
          //         left: 200,
          //         marginTop: -55,
          //         borderRadius: 100
          //       }}
          //       // onSubmit={() => this.props.createUserChatroomThunk(user.id)}
          //       onPress={async () => {
          //         console.log('ID', id);
          //         console.log('PROPSID', this.props.user.id);
          //         const response = await axios.post(
          //           `${ngrok}/api/users/createChatroom`,
          //           {
          //             user1Id: this.props.user.id,
          //             user2Id: id
          //           }
          //         );
          //         const chatroom = response.data;
          //         this.sendTextNotification(
          //           this.props.user,
          //           this.findUserInStore(Number(id))[0],
          //           props.apartment.name
          //         ); // send user 1 and 2 to axios req
          //         if (this.props.user.id === chatroom.user1Id) {
          //           this.props.navigation.navigate('Chatroom', {
          //             me: this.props.user,
          //             other: this.findUserInStore(chatroom.user2Id),
          //             chatId: `chat${chatroom.user1Id}-${chatroom.user2Id}`
          //           });
          //         } else {
          //           this.props.navigation.navigate('Chatroom', {
          //             me: this.props.user,
          //             other: this.findUserInStore(chatroom.user1Id),
          //             chatId: `chat${chatroom.user1Id}-${chatroom.user2Id}`
          //           });
          //         }
          //       }}
          //     >
          //       <LinearGradient
          //         colors={['#0000FF', '#008080']}
          //         style={{ height: 50, borderRadius: 50 / 2 }}
          //       >
          //         <Icon
          //           type="FontAwesome"
          //           name="comments"
          //           style={{ marginTop: 12 }}
          //         />
          //       </LinearGradient>
          //     </Button>
          //   </CardItem>
          // </Card>
        ))
        }
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
  getUsers: () => dispatch(getUsersThunk())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchesFromApartment);
