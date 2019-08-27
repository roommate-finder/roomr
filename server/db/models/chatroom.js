const Sequelize = require('sequelize');
const db = require('../db');
const Chatroom = db.define('chatroom', {});
Chatroom.findOrCreateChat = async function(user1Id, user2Id) {
  console.log('user1Id:', user1Id);
  console.log('user2Id:', user2Id);
  try {
    let chatroom = await Chatroom.find({
      where: {
        user1Id: {
          [Op.or]: [user1Id, user2Id]
        },
        user2Id: {
          [Op.or]: [user1Id, user2Id]
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
  } catch (error) {
    console.log('Error!');
  }
};
module.exports = Chatroom;
