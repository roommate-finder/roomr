import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'native-base';

// import * as Font from 'expo-font';

export default class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Add some friends"
          onPress={() => this.props.navigation.navigate('Friends')}
        >
          <Text>
            We have {this.props.screenProps.currentFriends.length} friends!
          </Text>
        </Button>
        <Button onPress={() => this.props.navigation.navigate('Login')}>
          <Text>Login with Facebook</Text>
        </Button>
        <Button onPress={() => this.props.navigation.navigate('FullMapView')}>
          <Text>Full Map View</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
