import React from 'react';
import { Image, StyleSheet } from 'react-native'
import { View, Text, Icon, Content } from 'native-base';
import MapView, { Marker } from 'react-native-maps';
// import console = require('console');

class ApartmentInfoFeed extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        const apartment = this.props.navigation.state.params.apartment;
        console.log('APARTMENT', apartment)
        const latitude = apartment.longitude
        const longitude = apartment.latitude
        const marker = { latitude: latitude, longitude: longitude }
        return (
            <Content>
                <Content>
                    <Text style={{ fontSize: 20 }} >{apartment.name}</Text>
                    <Text>
                        {apartment.address}, Unit: {apartment.unit}
                    </Text>
                    <Text>
                        {apartment.city}, {apartment.state} {apartment.zip}
                    </Text>

                    <Text>Rent: ${apartment.monthlyRent}</Text>
                    <Text style={{ fontSize: 20 }}> Details </Text>
                    <Text>Pet friendly: {apartment.petFriendly === true ? <Icon type="FontAwesome" name="check" style={{ color: 'green' }} /> : <Icon type="FontAwesome" name="times" style={{ color: 'red' }} />} </Text>
                    <Text>On-site parking: {apartment.parking === true ? <Icon type="FontAwesome" name="check" style={{ color: 'green' }} /> : <Icon type="FontAwesome" name="times" style={{ color: 'red' }} />} </Text>
                    <Text>AC included: {apartment.ac === true ? <Icon type="FontAwesome" name="check" style={{ color: 'green' }} /> : <Icon type="FontAwesome" name="times" style={{ color: 'red' }} />} </Text>
                    <Text>Pool: {apartment.pool === true ? <Icon type="FontAwesome" name="check" style={{ color: 'green' }} /> : <Icon type="FontAwesome" name="times" style={{ color: 'red' }} />} </Text>

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
                </Content>

                <Text style={{ paddingTop: 20 }}>
                    Description: {apartment.description}
                </Text>
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
export default ApartmentInfoFeed;

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
