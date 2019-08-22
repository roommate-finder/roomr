import React from 'react';
import { connect } from 'react-redux';

import MessageList from './MessageList';

// const mapStateToProps = state => ({
//   messages: state.messages
// });

const Messages = ({ messages }) => {
  return <MessageList style={{ minHeight: 100 }} />;
};

export default Messages;
