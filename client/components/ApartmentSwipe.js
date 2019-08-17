import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

export default class ApartmentSwipe extends React.Component {
  render() {
    return (
      <View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Image
            style={{
              width: 350,
              height: 350,
              marginTop: 80
            }}
            source={require('../images/kitten.jpeg')}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center'
          }}
        >
          <Image
            style={{
              width: 64,
              height: 64,
              marginTop: 50
            }}
            source={require('../images/heart-icon.png')}
          />
          <Image
            style={{
              width: 64,
              height: 64,
              marginTop: 50
            }}
            source={require('../images/x-icon.png')}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Image
            style={{
              marginTop: 20,
              width: 40,
              height: 40
            }}
            source={require('../images/info-icon.png')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
