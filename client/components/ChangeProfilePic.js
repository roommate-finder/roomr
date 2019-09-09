import React from 'react';
import {
  ImageEditor,
  Image,
  View,
  TouchableOpacity,
  Modal
} from 'react-native';
import { Text, Button } from 'native-base';
import { Camera } from 'expo-camera';
// import { ImagePicker } from 'expo';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';
import { updateUserThunk } from '../store/user';
import { connect } from 'react-redux';

class ChangeProfilePic extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    photoUploading: false,
    showBackButton: false
  };

  async componentDidMount() {
    this.setState({ user: this.props.user });
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({ hasCameraPermission: status === 'granted' });
  }

  async snapPhoto() {
    console.log('Button Pressed');
    if (this.camera) {
      console.log('Taking photo');
      const options = {
        quality: 1,
        base64: true,
        fixOrientation: true,
        exif: true
      };

      await this.camera.takePictureAsync(options).then(photo => {
        photo.exif.Orientation = 1;
        console.log('test-image', photo.uri);
        try {
          this.uploadImage(photo.uri, this.props.user.id);
        } catch (err) {
          console.log('error uploading photo', err);
        }
      });
      this.updatePictureInPostgres();
      setTimeout(() => {
        this.setState({
          showBackButton: true,
          photoUploading: false
        });
      }, 3200);
    }
  }
  async uploadImage(uri, imageName) {
    const response = await fetch(uri, imageName);
    const blob = await response.blob();
    var ref = await firebase
      .storage()
      .ref()
      .child('images/' + imageName);

    return ref.put(blob);
  }

  async updatePictureInPostgres() {
    let storageRef = await firebase
      .storage()
      .ref(`images/${this.props.user.id}`);
    const url = await storageRef.getDownloadURL();
    this.props.updateUser({
      id: this.props.user.id,
      photo: url
    });
  }
  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View>
          <View
            style={{
              width: 400,
              height: 400,
              marginTop: 120
            }}
          >
            <Camera
              ref={ref => {
                this.camera = ref;
              }}
              style={{ flex: 1, justifyContent: 'center' }}
              type={this.state.type}
            >
              <View
                style={{
                  backgroundColor: 'transparent'
                  // flexDirection: 'row',
                }}
              ></View>
            </Camera>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 20,
                marginRight: 25
              }}
            >
              <Button
                onPress={() => {
                  this.snapPhoto();
                  this.camera.pausePreview();
                  this.setState({ photoUploading: true });
                }}
                style={{
                  width: 150,
                  backgroundColor: '#0e677c',
                  flexDirection: 'row',
                  justifyContent: 'center'
                }}
              >
                <Text style={{ color: 'white' }}>Take Picture</Text>
              </Button>
              <Button
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                  });
                }}
                style={{
                  width: 150,
                  backgroundColor: '#0e677c',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginLeft: 10
                }}
              >
                <Text style={{ color: 'white' }}>Flip Camera</Text>
              </Button>
            </View>
          </View>
          <View>
            {this.state.photoUploading && (
              <View style={{ justifyContent: 'center', marginTop: 20 }}>
                <Text style={{ textAlign: 'center' }}>Photo uploading...</Text>
              </View>
            )}
            {this.state.showBackButton && (
              <View
                style={{
                  justifyContent: 'center',
                  marginTop: 20,
                  marginHorizontal: 20
                }}
              >
                <Button
                  style={{
                    backgroundColor: '#0e677c',
                    flexDirection: 'row',
                    justifyContent: 'center'
                  }}
                  onPress={() =>
                    this.props.navigation.navigate('UserProfile', {
                      placeholder: true
                    })
                  }
                >
                  <Text style={{ textAlign: 'center', color: 'white' }}>
                    Upload complete! Go back to profile.
                  </Text>
                </Button>
              </View>
            )}
          </View>
        </View>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => ({
  updateUser: user => dispatch(updateUserThunk(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeProfilePic);
