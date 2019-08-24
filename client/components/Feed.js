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
import { getFeedDataThunk, deleteUserApartmentThunk } from '../store/feed';
import { getApartmentsThunk } from '../store/apartments';
import { getUsersThunk } from '../store/users';
import { connect } from 'react-redux';
import * as Font from 'expo-font';
import Slideshow from 'react-native-image-slider-show';

//modal stuff
// import Modal from 'react-native-modal'

// const dataArray = [
//     { title: "First Element", content: "Lorem ipsum dolor sit amet" },
//     { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
//     { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
// ];

class Feed extends React.Component {
  constructor() {
    super();
    this.state = { modalVisible: false };
    this.findApartmentInStore = this.findApartmentInStore.bind(this);
    this.findUserInStore = this.findUserInStore.bind(this);
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Button transparent onPress={() => navigation.navigate('UserProfile')}>
          <Icon type="FontAwesome" name="user" style={{ color: 'grey' }} />
        </Button>
      ),
      headerTitle: (
        <Button
          transparent
          onPress={() => navigation.navigate('ApartmentSwipe')}
        >
          <Icon type="FontAwesome" name="home" style={{ color: 'grey' }} />
        </Button>
      ),

      headerRight: (
        <Button transparent>
          <Icon type="FontAwesome" name="users" style={{ color: '#0e677c' }} />
        </Button>
      )
    };
  };

  async componentDidMount() {
    await this.props.getFeedData(this.props.user);
    await this.props.getApartments();
    await this.props.getUsers();
  }

  findApartmentInStore(apartment) {
    const apartmentInStore = this.props.apartments.filter(
      apt => apt.id === apartment.apartmentId
    );
    return apartmentInStore;
  }

  findUserInStore(match) {
    const userInStore = this.props.users.filter(user => user.id === match);
    return userInStore;
  }

  render() {
    return (
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Button style={{ backgroundColor: 'none' }}>
            <Text style={{ color: '#0e677c', fontWeight: 'bold' }}>Feed</Text>
          </Button>
          {/* Adding | to separate Feed and Messages

          <Button style={{ backgroundColor: 'none' }}>
            <Text style={{ color: '#0e677c', fontWeight: 'bold' }}>|</Text>
          </Button> */}
          <Button
            style={{ backgroundColor: 'none' }}
            onPress={() => this.props.navigation.navigate('AllMessages')}
          >
            <Text style={{ color: '#0e677c' }}>Messages</Text>
          </Button>
        </View>
        <ScrollView>
          {this.props.feed[0] &&
            this.props.apartments.length > 0 &&
            this.props.users.length > 0 &&
            this.props.feed[0].map(apt => (
              <Card key={this.findApartmentInStore(apt)[0].id}>
                <CardItem>
                  <Left>
                    <Body>
                      <Text>{this.findApartmentInStore(apt)[0].name}</Text>
                      <Text note>
                        {this.findApartmentInStore(apt)[0].address}
                      </Text>
                    </Body>
                  </Left>
                  <Right>
                    <Button
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 20 / 2,
                        backgroundColor: '#ED4A6A',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      transparent
                      onPress={() => {
                        this.props.deleteUserApartment(
                          this.props.user.id,
                          this.findApartmentInStore(apt)[0].id
                        );
                      }}
                    >
                      <Icon
                        name="times"
                        type="FontAwesome"
                        style={{
                          color: '#FFFFFF',
                          fontSize: 10,
                          marginBottom: 2
                        }}
                      />
                    </Button>
                  </Right>
                </CardItem>
                <CardItem cardBody>
                  <Slideshow
                    dataSource={this.findApartmentInStore(apt)[0].photos}
                  />
                </CardItem>
                <CardItem>
                  {/* <Text>
                                    <Text>
                                        {apt.matches_array !== null ? apt.matches_array.split(', ').length : 0} matches
                                    </Text>
                                    {apt.matches_array !== null ? apt.matches_array.split(', ').map(match => <Text>{this.findUserInStore(Number(match))[0].firstName} {this.findUserInStore(Number(match))[0].lastName}</Text>) : ''}

                                </Text> */}
                  <Left>
                    {/* <Button
                                            transparent
                                            onPress={() =>
                                                this.props.navigation.navigate('MatchesFromApartment', {
                                                    apartment: this.findApartmentInStore(apt)[0],
                                                    matchIds: apt.matches_array.split(', ')
                                                })
                                            }
                                        >
                                            <Text>
                                                {apt.matches_array !== null
                                                    ? apt.matches_array.split(', ').length
                                                    : 0}{' '}
                                                matches
                      </Text>
                                        </Button> */}
                    {apt.matches_array !== null ? (
                      <Button
                        transparent
                        onPress={() =>
                          this.props.navigation.navigate(
                            'MatchesFromApartment',
                            {
                              apartment: this.findApartmentInStore(apt)[0],
                              matchIds: apt.matches_array.split(', ')
                            }
                          )
                        }
                      >
                        <Text>
                          {apt.matches_array !== null
                            ? apt.matches_array.split(', ').length
                            : 0}{' '}
                          matches
                        </Text>
                      </Button>
                    ) : (
                      <Text> No matches</Text>
                    )}
                  </Left>
                  <Right>
                    <Button
                      transparent
                      onPress={() =>
                        this.props.navigation.navigate('ApartmentInfoFeed', {
                          apartment: this.findApartmentInStore(apt)[0]
                        })
                      }
                    >
                      <Icon type="FontAwesome" name="info-circle" />
                    </Button>
                  </Right>
                </CardItem>
              </Card>
            ))}
        </ScrollView>
      </View>

      // <Container>
      //     <Card>
      //         <CardItem>
      //             <Left>
      //                 <Thumbnail source={{ uri: 'Image URL' }} />
      //                 <Body>
      //                     <Text>NativeBase</Text>
      //                     <Text note>GeekyAnts</Text>
      //                 </Body>
      //             </Left>
      //         </CardItem>
      //         <CardItem cardBody>
      //             <Image source={{ uri: 'https://placekitten.com/300/300' }} style={{ height: 200, width: null, flex: 1 }} />
      //         </CardItem>
      //     </Card>
      //     <Content style={styles.container}>
      //         <Text>hi</Text>
      //         {/* <Text>THIS IS THE FEED</Text> */}
      //         {/* {this.props.feed[0] && this.props.feed[0].map(apt => <Text>{apt.apartmentId}</Text>)} */}

      //         {/* {this.props.feed[0] && this.props.apartments.length > 0 && this.props.users.length > 0 && this.props.feed[0].map(apt =>

      //         <Text>

      //             <Text>{this.findApartmentInStore(apt)[0].name}</Text>

      //             <Thumbnail large source={{ uri: this.findApartmentInStore(apt)[0].image }} />
      //             {apt.matches_array !== null ? apt.matches_array.split(', ').map(match => <Text>{this.findUserInStore(Number(match))[0].firstName}</Text>) : ''}
      //         </Text>

      //     )} */}

      //     </Content >
      // </Container>
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
  deleteUserApartment: (userId, apartmentId) =>
    dispatch(deleteUserApartmentThunk(userId, apartmentId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);
