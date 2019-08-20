import React from 'react';
import { ImageBackground, Dimensions } from 'react-native';
import {
  ListView,
  View,
  Text,
  Row,
  Image,
  Subtitle,
  Caption,
  Heading
} from '@shoutem/ui';

import moment from 'moment';

// source={{ uri: msg.author.avatar }} />
const Message = ({ msg }) => (
  <Row>
    <Image
      styleName="small-avator top"
      source={require('../../assets/images/08.jpg')}
      style={{
        width: 30,
        height: 30
      }}
    />
    <View styleName="vertical">
      <View styleName="horizontal space-between">
        <Subtitle>{msg.author.name}</Subtitle>
        <Caption>{moment(msg.time).from(Date.now())}</Caption>
      </View>
      <Text styleName="multiline">{msg.text}</Text>
    </View>
  </Row>
);

const MessageList = ({ messages, onLayout }) => (
  <ListView
    data={messages}
    autoHideHeader={true}
    renderRow={msg => <Message msg={msg} />}
    onLayout={onLayout}
  />
);

export default MessageList;
