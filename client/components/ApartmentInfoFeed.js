import React from 'react';

import { View, Text } from 'native-base';

class ApartmentInfoFeed extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        const apartment = this.props.navigation.state.params.apartment;
        return (
            <View>
                <View>
                    <Text>Building: {apartment.name}</Text>
                    <Text>
                        Address: {apartment.address}, Unit#{apartment.unit}
                    </Text>
                    <Text>
                        {apartment.city} {apartment.state}, {apartment.zip}
                    </Text>
                    <Text>Rent: ${apartment.monthlyRent}</Text>
                </View>

                <Text style={{ paddingTop: 20 }}>
                    Description: {apartment.description}
                </Text>
            </View>
        );
    }
}

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
