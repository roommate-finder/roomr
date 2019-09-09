import React from 'react';
import { StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';

class FeedMap extends React.Component {
  constructor() {
    super();
    this.state = {
      markers: []
    };
    this.findApartmentById = this.findApartmentById.bind(this);
  }

  findApartmentById(id) {
    const apartmentInStore = this.props.apartments.filter(apt => apt.id === id);
    return apartmentInStore[0];
  }

  render() {
    return (
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 41.8781,
          longitude: -87.6298,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        {/* {this.props.feed.map(apt => <Text> {this.findApartmentById(apt.apartmentId).latitude}</Text>)} */}
        {this.props.apartments &&
          this.props.feed.map(apt => (
            <Marker
              title={this.findApartmentById(apt.apartmentId).name}
              description={this.findApartmentById(apt.apartmentId).address}
              coordinate={{
                latitude: this.findApartmentById(apt.apartmentId).longitude,
                longitude: this.findApartmentById(apt.apartmentId).latitude
              }}
            ></Marker>
          ))}
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

const mapStateToProps = state => {
  return {
    feed: state.feed[0],
    apartments: state.apartments
  };
};

export default connect(mapStateToProps)(FeedMap);
