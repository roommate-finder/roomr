import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'native-base';

// import * as Font from 'expo-font';

export default class Home extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Home',
      headerRight: (
        <Button
          onPress={() => navigation.navigate('Friends')}
          title="FRIENDS"
          color="#000"
        />
      )
    };
  };
  render() {
    return (
      <View style={styles.container}>
        <Button onPress={() => this.props.navigation.navigate('Friends')}>
          <Text>Add some friends</Text>
        </Button>
        <Button
          title="User profile"
          onPress={() => this.props.navigation.navigate('UserProfile')}
        >
          <Text>User Profile</Text>
        </Button>
        <Button
          title="Phone login"
          onPress={() => this.props.navigation.navigate('PhoneLogin')}
        >
          <Text>Phone login</Text>
        </Button>
        <Button onPress={() => this.props.navigation.navigate('Login')}>
          <Text>Login with Facebook</Text>
        </Button>
        <Button onPress={() => this.props.navigation.navigate('FullMapView')}>
          <Text>Full Map View</Text>
        </Button>
        <Button
          onPress={() => this.props.navigation.navigate('ApartmentSwipe')}
        >
          <Text>Apartment Swipe</Text>
        </Button>
        <Button onPress={() => this.props.navigation.navigate('AllMessages')}>
          <Text>All Messages</Text>
        </Button>
        <Button onPress={() => this.props.navigation.navigate('SingleMessage')}>
          <Text>Single Message</Text>
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
