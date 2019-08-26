import React from 'react';
import { ScrollView, Image } from 'react-native';
import {
  Container,
  Header,
  View,
  DeckSwiper,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Icon,
  Button
} from 'native-base';
// import ApartmentInfo from './ApartmentInfo';
// import SmallMapView from './SmallMapView';
import { connect } from 'react-redux';
import { getApartmentsThunk } from '../store/apartments';
import { createUserApartmentThunk } from '../store/user-apartments';
import { getUnseenApartmentsThunk } from '../store/unseen-apartments';
import Slideshow from 'react-native-image-slider-show';
import CacheImage from './CacheImage';

//because database does not currently have images
const tempImage = require('../images/kitten.jpeg');

class ApartmentSwipe extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      disabled: false
    };
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Button transparent onPress={() => navigation.navigate('UserProfile')}>
          <Icon type="FontAwesome" name="user" style={{ color: 'grey' }} />
        </Button>
      ),
      headerTitle: (
        <View style={{ flexDirection: 'row' }}>
          <Button style={{ marginRight: 55 }} transparent>
            <Icon
              type="FontAwesome"
              name="home"
              style={{ color: '#0e677c', fontSize: 30 }}
            />
          </Button>
          <Button transparent onPress={() => navigation.navigate('Feed')}>
            <Icon type="FontAwesome" name="heart" style={{ color: 'grey' }} />
          </Button>
        </View>
      ),

      headerRight: (
        <Button
          transparent
          style={{ marginBottom: 4 }}
          onPress={() => navigation.navigate('AllMessages')}
        >
          <Icon
            type="FontAwesome"
            name="comments"
            style={{ color: 'grey', fontSize: 30 }}
          />
        </Button>
      )
    };
  };

  async componentDidMount() {
    setTimeout(() => {
      this.setState({
        loaded: true
      });
    }, 3000);
    await this.props.getApartments();
    await this.props.getUnseenApartments(this.props.user);
  }
  //disable yes and no buttons for 1/2 second for async action
  pressButton = () => {
    this.setState({
      disabled: true
    });
    // enable after 500 ms
    setTimeout(() => {
      this.setState({
        disabled: false
      });
    }, 500);
  };

  render() {
    const { unseenApartments } = this.props;

    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        ref={scrollView => {
          this.scrollView = scrollView;
        }}
      >
        {this.props.unseenApartments.length !== 0 && this.state.loaded ? (
          <Container>
            <Header />

            <DeckSwiper
              ref={c => (this._deckSwiper = c)}
              dataSource={unseenApartments}
              looping={false}
              onSwipeLeft={() => {
                this.props.createUserApartment(
                  this._deckSwiper._root.state.selectedItem.id,
                  this.props.user.id,
                  false
                );
              }}
              onSwipeRight={() => {
                this.props.createUserApartment(
                  this._deckSwiper._root.state.selectedItem.id,
                  this.props.user.id,
                  true
                );
              }}
              renderEmpty={() => (
                <View style={{ alignSelf: 'center' }}>
                  <Text>Over</Text>
                </View>
              )}
              renderItem={item => (
                <Card style={{ elevation: 3 }}>
                  <CardItem>
                    <Left>
                      <Body>
                        <Text>{item.name}</Text>
                        <Text>Bedrooms: {item.numBedrooms}</Text>
                        <Text>Monthly rent: ${item.monthlyRent}</Text>
                        <Text note>{item.address}</Text>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem cardBody>
                    <Slideshow dataSource={item.photos} />
                  </CardItem>
                  <CardItem
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      marginTop: 20
                    }}
                  >
                    <Button
                      style={{
                        width: 65,
                        height: 65,
                        borderRadius: 65 / 2,
                        backgroundColor: '#ED4A6A',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      disabled={this.state.disabled}
                      onPress={() => {
                        this.pressButton();
                        this._deckSwiper._root.swipeLeft();
                        this.props.createUserApartment(
                          this._deckSwiper._root.state.selectedItem.id,
                          this.props.user.id,
                          false
                        );
                      }}
                    >
                      <Icon
                        name="times"
                        type="FontAwesome"
                        style={{
                          color: '#FFFFFF',
                          fontSize: 32.5,
                          marginBottom: 3
                        }}
                      />
                    </Button>
                    <Button
                      style={{
                        width: 65,
                        height: 65,
                        borderRadius: 65 / 2,
                        backgroundColor: '#ED4A6A'
                      }}
                      disabled={this.state.disabled}
                      onPress={() => {
                        this.pressButton();
                        this._deckSwiper._root.swipeRight();
                        this.props.createUserApartment(
                          this._deckSwiper._root.state.selectedItem.id,
                          this.props.user.id,
                          true
                        );
                      }}
                    >
                      <Icon
                        name="heart"
                        type="AntDesign"
                        style={{
                          color: '#FFFFFF',
                          fontSize: 32.5,
                          marginTop: 3
                        }}
                      />
                    </Button>
                  </CardItem>
                  <CardItem
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Button
                      style={{
                        backgroundColor: 'none'
                      }}
                      onPress={() => {
                        this.props.navigation.navigate('ApartmentInfoFeed', {
                          apartment: item
                        });
                      }}
                    >
                      <Icon
                        name="info-circle"
                        type="FontAwesome"
                        style={{ color: '#ED4A6A', fontSize: 30 }}
                      />
                    </Button>
                  </CardItem>
                  <CardItem style={{ justifyContent: 'center' }} />
                </Card>
              )}
            />
          </Container>
        ) : (
          // <Loader />
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text>Loading Apartments...</Text>
            <CacheImage
              source={{
                uri:
                  'https://loading.io/spinners/wedges/lg.rotate-pie-preloader-gif.gif'
              }}
              style={{ width: 200, height: 200 }}
            />
          </View>
        )}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    apartments: state.apartments,
    unseenApartments: state.unseenApartments
  };
};

const mapDispatchToProps = dispatch => ({
  getUnseenApartments: user => dispatch(getUnseenApartmentsThunk(user)),
  getApartments: () => dispatch(getApartmentsThunk()),
  createUserApartment: (apartmentId, userId, likedBoolean) =>
    dispatch(createUserApartmentThunk(apartmentId, userId, likedBoolean))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApartmentSwipe);
