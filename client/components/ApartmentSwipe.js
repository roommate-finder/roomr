import React from 'react';
import { StyleSheet, Image, ScrollView } from 'react-native';
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
import ApartmentInfo from './ApartmentInfo';
import SmallMapView from './SmallMapView';
import { connect } from 'react-redux';
import { getApartmentsThunk } from '../store/apartments';

//because database does not currently have images
const tempImage = require('../images/kitten.jpeg');

class ApartmentSwipe extends React.Component {
  constructor() {
    super();
    this.state = {
      viewInfo: false,
      currentApt: {}
    };
  }
  componentDidMount() {
    this.props.getApartments();
  }
  getAptInfo = apartment => {
    // this.setState({ viewInfo: !this.state.viewInfo, currentApt: apartment });
    this.setState(prevState => ({
      viewInfo: !prevState.viewInfo,
      currentApt: apartment
    }));
    if (this.state.viewInfo === false) {
      this.scrollToEnd();
    } else {
      this.scrollToTop();
    }
  };

  scrollToEnd = () => {
    this.scrollView.scrollToEnd();
  };
  scrollToTop = () => {
    this.scrollView.scrollTo({ x: 0, y: 0, animated: true });
  };

  render() {
    const { apartments } = this.props;
    return (
      <ScrollView
        ref={scrollView => {
          this.scrollView = scrollView;
        }}
      >
        {this.props.apartments.length !== 0 && (
          <Container>
            <Header />
            <View>
              <DeckSwiper
                ref={c => (this._deckSwiper = c)}
                dataSource={apartments}
                looping={false}
                onSwipeLeft={() => this.setState({ viewInfo: false })}
                onSwipeRight={() => this.setState({ viewInfo: false })}
                renderEmpty={() => (
                  <View style={{ alignSelf: 'center' }}>
                    <Text>Over</Text>
                  </View>
                )}
                renderItem={item => (
                  <Card style={{ elevation: 3 }}>
                    <CardItem>
                      <Left>
                        <Thumbnail source={tempImage} />
                        <Body>
                          <Text>{item.name}</Text>
                          <Text note>{item.address}</Text>
                        </Body>
                      </Left>
                    </CardItem>
                    <CardItem cardBody>
                      <Image
                        style={{ height: 300, flex: 1 }}
                        source={tempImage}
                      />
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
                        onPress={() => this._deckSwiper._root.swipeLeft()}
                      >
                        <Icon
                          name="times"
                          type="FontAwesome"
                          style={{ color: '#FFFFFF', fontSize: 32.5 }}
                        />
                      </Button>
                      <Button
                        style={{
                          width: 65,
                          height: 65,
                          borderRadius: 65 / 2,
                          backgroundColor: '#ED4A6A'
                        }}
                        onPress={() => this._deckSwiper._root.swipeRight()}
                      >
                        <Icon
                          name="heart"
                          type="AntDesign"
                          style={{ color: '#FFFFFF', fontSize: 32.5 }}
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
                          this.getAptInfo(item);
                        }}
                      >
                        <Icon
                          name="info-circle"
                          type="FontAwesome"
                          style={{ color: '#ED4A6A' }}
                        />
                      </Button>
                    </CardItem>
                    <CardItem style={{ justifyContent: 'center' }}>
                      {this.state.viewInfo === true && (
                        <View>
                          <SmallMapView apartment={this.state.currentApt} />
                          <ApartmentInfo
                            apartment={this.state.currentApt}
                            scrollToEnd={this.scrollToEnd}
                          />
                        </View>
                      )}
                    </CardItem>
                  </Card>
                )}
              />
            </View>
          </Container>
        )}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    apartments: state.apartments
  };
};

const mapDispatchToProps = dispatch => ({
  getApartments: () => dispatch(getApartmentsThunk())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApartmentSwipe);
