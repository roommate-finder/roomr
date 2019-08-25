import React from 'react';
import { Image } from 'react-native';
import shorthash from 'shorthash';
// import { FileSystem } from 'expo';
import * as FileSystem from 'expo-file-system';

export default class CacheImage extends React.Component {
  state = {
    source: null
  };

  async componentDidMount() {
    const { uri } = this.props.source; // pass in location of the file on the internet
    console.log('TCL: CacheImage -> componentDidMount -> uri', uri);
    // const name = shorthash.unique(uri); // hash it for security
    // console.log('NAME', name);
    const path = await `${FileSystem.documentDirectory}${uri}`;
    console.log('TCL: CacheImage -> componentDidMount -> path', path);
    const image = await FileSystem.getInfoAsync(path);
    console.log('TCL: CacheImage -> componentDidMount -> image', image);
    if (image.exists) {
      console.log('read image from cache');
      this.setState({
        source: {
          uri: image.uri
        }
      });
      return;
    }

    console.log('downloading image to cache');
    const newImage = await FileSystem.downloadAsync(
      'https://loading.io/spinners/ball/lg.bouncing-circle-loading-icon.gif',
      FileSystem.documentDirectory + 'lg.bouncing-circle-loading-icon.gif'
    );
    console.log('TCL: CacheImage -> componentDidMount -> newImage', newImage);
    this.setState({
      source: {
        uri: newImage.uri
      }
    });
  }

  render() {
    return <Image style={this.props.style} source={this.state.source} />;
  }
}
