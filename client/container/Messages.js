import React from 'react';
import { connect } from 'react-redux';
import { View, Spinner } from '@shoutem/ui';

import MessageList from './MessageList';

const mapStateToProps = state => ({
  messages: state.messages
});

const Messages = connect(mapStateToProps)(({ messages }) => {
  return <MessageList messages={messages} style={{ minHeight: 100 }} />;
});

export default Messages;
