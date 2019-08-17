import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
// import * as Font from 'expo-font';

export default class Home extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Home',
      headerRight: (
        <Button
          onPress={() => navigation.navigate("Friends")}
          title="FRIENDS"
          color="#000"
        />
      ),
    }

  };
  render() {
    return (
      <View style={styles.container}>
        <Text>
          We have {this.props.screenProps.currentFriends.length} friends!
        </Text>
        <Button
          title="Add some friends"
          onPress={() => this.props.navigation.navigate("Friends")}
        />
        <Button
          title="User profile"
          onPress={() => this.props.navigation.navigate("UserProfile")}

        />
        <Button
          title="Phone login"
          onPress={() => this.props.navigation.navigate("PhoneLogin")}

        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
