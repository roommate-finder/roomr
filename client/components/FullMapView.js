import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MapView from 'react-native-maps';
import * as Permissions from 'expo-permissions';

export default class FullMapView extends React.Component {
  state = { latitude: null, longitude: null };

  async componentDidMount() {
    const { status } = await Permissions.getAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      const response = await Permissions.askAsync(Permissions.LOCATION);
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) =>
        this.setState({ latitude, longitude }, () =>
          console.log('State:', error => console.log('Error', error))
        )
    );
  }
  render() {
    const { latitude, longitude } = this.state;
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
        />
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>We need your permission!</Text>
      </View>
      //COORDINATES FOR CHICAGO
      // <MapView
      //   style={styles.map}
      //   initialRegion={{
      //     latitude: 41.8781,
      //     longitude: -87.6298,
      //     latitudeDelta: 0.0922,
      //     longitudeDelta: 0.0421
      //   }}
      // ></MapView>
    );
  }
}
const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
