const Sequelize = require('sequelize');
const db = require('../db');
const Chatroom = db.define('chatroom', {});
Chatroom.findOrCreateChat = async function(user1Id, user2Id) {
  console.log('user1Id:', user1Id);
  console.log('user2Id:', user2Id);

  let chatroom = await Chatroom.findOne({
    where: {
      user1Id: {
        [Sequelize.Op.or]: [user1Id, user2Id]
      },
      user2Id: {
        [Sequelize.Op.or]: [user1Id, user2Id]
      }
    }
    //   include: [db.models.message],
    //   order: [[db.models.message, 'createdAt', 'DESC']]
  });

  if (chatroom) {
    return chatroom;
  } else {
    return await Chatroom.create(
      {
        user1Id: user1Id,
        user2Id: user2Id
      },
      {
        //   include: [db.models.message],
        //   order: [[db.models.message, 'createdAt', 'DESC']]
      }
    );
  }
};
module.exports = Chatroom;
