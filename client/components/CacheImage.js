import React from 'react';
import { Image } from 'react-native';

import * as FileSystem from 'expo-file-system';

export default class CacheImage extends React.Component {
  state = {
    source: null
  };

  async componentDidMount() {
    const { uri } = this.props.source; // pass in location of the file on the internet
    const path = await `${FileSystem.documentDirectory}lg.rotate-pie-preloader-gif.gif`;
    const image = await FileSystem.getInfoAsync(path);
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
      'https://loading.io/spinners/wedges/lg.rotate-pie-preloader-gif.gif',
      FileSystem.documentDirectory + 'lg.rotate-pie-preloader-gif.gif'
    );

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
