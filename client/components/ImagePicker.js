import * as React from 'react';
import { Text, ScrollView, StyleSheet, CameraRoll, View } from 'react-native';

import { Button } from 'native-base';
// import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import ImagePicker from 'react-native-image-picker';

const options = {
  title: 'my pic app',
  takePhotoButtonTitle: 'Take photo with your camera',
  chooseFromLibraryButtonTitle: ' choose photo from library'
};
export default class ImagePickerExample extends React.Component {
  constructor(props) {
    super();
    this.state = {
      avatarSource: null
    };
  }

  selectImage = () => {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source
        });
      }
    });
  };
  render() {
    return (
      <View>
        <Button onPress={this.selectImage}>
          <Text>Select Image</Text>
        </Button>
      </View>
    );
  }
}
