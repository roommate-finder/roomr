import React from 'react';

import { View, Image, Text } from 'react-native';

const loaderImage = require('../images/loader.gif');

export default class Loader extends React.Component {
  // static load(cb) {
  //   setTimeout(cb, 5000);
  // }
  render() {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text>LOADING APARTMENTS</Text>
        <Image source={loaderImage} style={{ marginTop: 200 }} />
      </View>
    );
  }
}
