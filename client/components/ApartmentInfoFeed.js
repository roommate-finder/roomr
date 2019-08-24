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
  Thumbnail,
  Left,
  Body,
  Right,
  Button
} from 'native-base';

import { connect } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';

const styles = StyleSheet.create({
  map: {
    width: 300,
    height: 300
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  }
});

class ApartmentInfoFeed extends React.Component {
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
          <Header>
            <Text style={{ fontWeight: 'bold' }}>{aptInStore.name} Info</Text>
          </Header>
          <Text style={{ margin: 20, fontSize: 12 }}>
            {aptInStore.description}
          </Text>
          <Content>
            <List>
              <ListItem thumbnail>
                <Body style={styles.body}>
                  <Text>Pet Friendly:</Text>
                  <Text>
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
                    )}{' '}
                  </Text>
                </Body>
              </ListItem>
              <ListItem thumbnail>
                <Body style={styles.body}>
                  <Text>On-site parking:</Text>
                  <Text>
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
                    )}{' '}
                  </Text>
                </Body>
              </ListItem>
              <ListItem thumbnail>
                <Body style={styles.body}>
                  <Text>AC included:</Text>
                  <Text>
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
                    )}{' '}
                  </Text>
                </Body>
              </ListItem>
              <ListItem thumbnail>
                <Body style={styles.body}>
                  <Text>Pool:</Text>
                  <Text>
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
                    )}{' '}
                  </Text>
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
