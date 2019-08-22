import React from 'react';
import {
  ImageBackground,
  Dimensions,
  Text,
  Image,
  FlatList
} from 'react-native';
// import {
//   ListView,
//   View,
//   Text,
//   Row,
//   Image,
//   Subtitle,
//   Caption,
//   Heading
// } from '@shoutem/ui';

// import moment from 'moment';
// require('../../assets/images/08.jpg');
// source={{ uri: msg.author.avatar }} />
const Message = ({ msg }) => (
  <Row>
    <Image
      styleName="small-avator top"
      style={{
        width: 30,
        height: 30
      }}
    />
    <View styleName="vertical">
      <View styleName="horizontal space-between">
        <Title>{msg.firstName}</Title>
        <Text>{msg.time}</Text>
      </View>
      <Text styleName="multiline">{msg.message}</Text>
    </View>
  </Row>
);

const MessageList = ({ messages, onLayout }) => (
  <FlatList
    data={messages}
    autoHideHeader={true}
    renderRow={msg => <Message msg={msg} />}
    onLayout={onLayout}
  />
);

export default MessageList;
