function getOtherUser(allUsers, user, chatroom) {
  if (chatroom.user1Id === user.id) {
    return allUsers.filter(aUser => aUser.id === chatroom.user2Id);
  } else {
    return allUsers.filter(aUser => aUser.id === chatroom.user1Id);
  }
}

module.exports = getOtherUser;
