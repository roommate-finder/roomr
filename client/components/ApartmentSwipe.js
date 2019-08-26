import React from 'react';
import { ScrollView } from 'react-native';
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
//because database does not currently have images
const tempImage = require('../images/kitten.jpeg');

class ApartmentSwipe extends React.Component {
  constructor() {
    super();
    this.state = {
      // viewInfo: false,
      // currentApt: {},
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

  // in case we want to attemp scrolling again
  // scrollToEnd = () => {
  //   this.scrollView.scrollToEnd();
  // };
  // scrollToTop = () => {
  //   this.scrollView.scrollTo({ x: 0, y: 0, animated: true });
  // };

  render() {
    const { unseenApartments } = this.props;
    //const { apartments } = this.props;
    //console.log('******APARTMENTS********', apartments)
    //console.log('****************UNSEEN APARTMENTS', unseenApartments)
    return (
      <ScrollView
        ref={scrollView => {
          this.scrollView = scrollView;
        }}
      >
        {this.props.unseenApartments.length !== 0 && (
          <Container>
            <Header />

            <DeckSwiper
              ref={c => (this._deckSwiper = c)}
              dataSource={unseenApartments}
              looping={false}
              onSwipeLeft={() => {
                // this.setState({ viewInfo: false });
                this.props.createUserApartment(
                  this._deckSwiper._root.state.selectedItem.id,
                  this.props.user.id,
                  false
                );
              }}
              onSwipeRight={() => {
                // this.setState({ viewInfo: false });
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
                        // this.setState({ viewInfo: false });
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
                        // this.setState({ viewInfo: false });
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
                        // this.getAptInfo(item);
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
        )}
        <View />
        {/* {this.state.viewInfo === true && (
          <View>
            <SmallMapView style={{margin:}} apartment={this.state.currentApt} />
            <ApartmentInfo
              apartment={this.state.currentApt}
              scrollToEnd={this.scrollToEnd}
            />
          </View>
        )} */}
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
