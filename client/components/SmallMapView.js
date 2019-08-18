import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import * as Permissions from 'expo-permissions';

export default class SmallMapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: props.apartment.latitude,
      longitude: props.apartment.longitude,
      marker: {
        latitude: props.apartment.latitude,
        longitude: props.apartment.longitude
      }
    };
  }

  render() {
    const { latitude, longitude, marker } = this.state;
    console.log('MARKER', this.state.marker);
    if (latitude) {
      return (
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
      );
    }
    // return (
    //   // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //   //   <Text>We need your permission!</Text>
    //   // </View>
    //   // COORDINATES FOR CHICAGO
    //   <MapView
    //     style={styles.map}
    //     initialRegion={{
    //       latitude: 41.8781,
    //       longitude: -87.6298,
    //       latitudeDelta: 0.0922,
    //       longitudeDelta: 0.0421
    //     }}
    //   />
    // );
  }
}
const styles = StyleSheet.create({
  map: {
    width: 150,
    height: 150
  }
});
