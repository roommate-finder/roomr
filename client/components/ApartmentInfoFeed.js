import React from 'react';
import { Image, StyleSheet } from 'react-native';
import {
  View,
  Text,
  Icon,
  Content,
  Container,
  Header,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Button
} from 'native-base';

import { connect } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';

class ApartmentInfoFeed extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {

      headerTitle: (
        <View style={{ flexDirection: 'row' }}>
          <Text>{navigation.state.params.apartment.name}</Text>
        </View>
      ),


    };
  };
  constructor() {
    super();
    this.state = {};
  }
  findApartmentInStore = apartment => {
    const apartmentInStore = this.props.apartments.filter(
      apt => apt.id === apartment.id
    );
    return apartmentInStore;
  };

  render() {
    const apartment = this.props.navigation.state.params.apartment;
    const aptInStore = this.findApartmentInStore(apartment)[0];
    const latitude = aptInStore.longitude;
    const longitude = aptInStore.latitude;
    const marker = { latitude: latitude, longitude: longitude };
    return (
      <Container>
        <Container>
          <Text style={{ fontSize: 12, margin: 20 }}>
            {aptInStore.description}
          </Text>
          <Content>
            <List>
              <ListItem>
                <Left>
                  <Text>Address:</Text>
                </Left>
                <Body>
                  <Text>
                    {aptInStore.address}, Unit {aptInStore.unit}
                  </Text>
                  <Text>
                    {aptInStore.city}, {aptInStore.state} {aptInStore.zip}
                  </Text>
                </Body>
              </ListItem>
              <ListItem>
                <Left>
                  <Text>Monthly rent:</Text>
                </Left>
                <Body>
                  <Text>${aptInStore.monthlyRent}</Text>
                </Body>
              </ListItem>
              <ListItem>
                <Left>
                  <Text>Bedrooms:</Text>
                </Left>
                <Body>
                  <Text>{aptInStore.numBedrooms}</Text>
                </Body>
              </ListItem>
              <ListItem>
                <Left>
                  <Text>Bathrooms:</Text>
                </Left>
                <Body>
                  <Text>{aptInStore.numBathrooms}</Text>
                </Body>
              </ListItem>
              <ListItem>
                <Left>
                  <Text>Pet Friendly:</Text>
                </Left>
                <Body>
                  {aptInStore.petFriendly === true ? (
                    <Icon
                      type="FontAwesome"
                      name="check"
                      style={{ color: 'green' }}
                    />
                  ) : (
                      <Icon
                        type="FontAwesome"
                        name="times"
                        style={{ color: 'red' }}
                      />
                    )}
                </Body>
              </ListItem>

              <ListItem>
                <Left>
                  <Text>On-site parking:</Text>
                </Left>
                <Body>
                  {aptInStore.parking === true ? (
                    <Icon
                      type="FontAwesome"
                      name="check"
                      style={{ color: 'green' }}
                    />
                  ) : (
                      <Icon
                        type="FontAwesome"
                        name="times"
                        style={{ color: 'red' }}
                      />
                    )}
                </Body>
              </ListItem>

              <ListItem>
                <Left>
                  <Text>AC included:</Text>
                </Left>
                <Body>
                  {aptInStore.ac === true ? (
                    <Icon
                      type="FontAwesome"
                      name="check"
                      style={{ color: 'green' }}
                    />
                  ) : (
                      <Icon
                        type="FontAwesome"
                        name="times"
                        style={{ color: 'red' }}
                      />
                    )}
                </Body>
              </ListItem>
              <ListItem>
                <Left>
                  <Text>Pool:</Text>
                </Left>
                <Body>
                  {aptInStore.pool === true ? (
                    <Icon
                      type="FontAwesome"
                      name="check"
                      style={{ color: 'green' }}
                    />
                  ) : (
                      <Icon
                        type="FontAwesome"
                        name="times"
                        style={{ color: 'red' }}
                      />
                    )}
                </Body>
              </ListItem>
              <ListItem thumbnail>
                <Body style={{ justifyContent: 'center' }}>
                  <MapView
                    showsUserLocation
                    style={{
                      width: 300,
                      height: 300
                    }}
                    initialRegion={{
                      latitude: latitude,
                      longitude: longitude,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421
                    }}
                  >
                    <Marker coordinate={marker} />
                  </MapView>
                </Body>
              </ListItem>
            </List>
          </Content>
        </Container>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    apartments: state.apartments
  };
};

export default connect(mapStateToProps)(ApartmentInfoFeed);
