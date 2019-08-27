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
    photoUploading: false
  };

  async componentDidMount() {
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
    await this.props.updateUser({
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
        <View style={{ width: 400, height: 400 }}>
          <Camera
            ref={ref => {
              this.camera = ref;
            }}
            style={{ flex: 1 }}
            type={this.state.type}
          >
            <View
              style={{
                backgroundColor: 'transparent',
                flexDirection: 'row'
              }}
            >
              <TouchableOpacity
                style={{
                  justifyContent: 'center'
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                  });
                }}
              >
                <Text style={{ fontSize: 18, marginTop: 100, color: 'white' }}>
                  {' '}
                  Flip{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
          <Button
            onPress={() => {
              this.snapPhoto();
              this.camera.pausePreview();
              this.setState({ photoUploading: true });
            }}
            style={{ width: 200, color: '#0e677c' }}
          >
            <Text style={{ color: 'white' }}>Take Picture</Text>
          </Button>
          {this.state.photoUploading && <Text>Photo uploading!</Text>}
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
