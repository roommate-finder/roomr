import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { View, Text, Icon, Content } from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';

// import console = require('console');

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
      <Content>
        <Content>
          <Text style={{ fontSize: 20 }}>{aptInStore.name}</Text>
          <Text>
            {aptInStore.address}, Unit: {aptInStore.unit}
          </Text>
          <Text>
            {aptInStore.city}, {aptInStore.state} {aptInStore.zip}
          </Text>

          <Text>Rent: ${aptInStore.monthlyRent}</Text>
          <Text style={{ fontSize: 20 }}> Details </Text>
          <Text>
            Pet friendly:{' '}
            {aptInStore.petFriendly === true ? (
              <Icon
                type="FontAwesome"
                name="check"
                style={{ color: 'green' }}
              />
            ) : (
              <Icon type="FontAwesome" name="times" style={{ color: 'red' }} />
            )}{' '}
          </Text>
          <Text>
            On-site parking:{' '}
            {aptInStore.parking === true ? (
              <Icon
                type="FontAwesome"
                name="check"
                style={{ color: 'green' }}
              />
            ) : (
              <Icon type="FontAwesome" name="times" style={{ color: 'red' }} />
            )}{' '}
          </Text>
          <Text>
            AC included:{' '}
            {aptInStore.ac === true ? (
              <Icon
                type="FontAwesome"
                name="check"
                style={{ color: 'green' }}
              />
            ) : (
              <Icon type="FontAwesome" name="times" style={{ color: 'red' }} />
            )}{' '}
          </Text>
          <Text>
            Pool:{' '}
            {aptInStore.pool === true ? (
              <Icon
                type="FontAwesome"
                name="check"
                style={{ color: 'green' }}
              />
            ) : (
              <Icon type="FontAwesome" name="times" style={{ color: 'red' }} />
            )}{' '}
          </Text>

          <MapView
            showsUserLocation
            style={styles.map}
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
          >
            <Marker coordinate={marker} />
          </MapView>
          <Text style={{ paddingTop: 20 }}>
            Description: {aptInStore.description}
          </Text>
        </Content>
      </Content>
    );
  }
}
const styles = StyleSheet.create({
  map: {
    width: 300,
    height: 300
  }
});

const mapStateToProps = state => {
  return {
    apartments: state.apartments
  };
};

export default connect(mapStateToProps)(ApartmentInfoFeed);

/*
Apartment {
            "apartment": Object {
            "address": "201 N Garland Ct",
        "city": "Chicago",
        "createdAt": "2019-08-15T18:17:25.238Z",
        "description": "idk",
        "id": 2,
        "monthlyRent": 3284,
        "name": "MILA",
        "numBathrooms": 2,
        "numBedrooms": 2,
        "squareFeet": 1107,
        "state": "IL",
        "unit": "07",
        "updatedAt": "2019-08-15T18:17:25.238Z",
        "zip": 60601,
      },
    */
