const Sequelize = require('sequelize');
const db = require('../db');
const Chatroom = db.define('chatroom', {
  chatId: Sequelize.INTEGER,
  user1Id: Sequelize.INTEGER,
  user2Id: Sequelize.INTEGER
});

Chatroom.findOrCreate = async function(user1Id, user2Id) {
  try {
    let chatroom = await Chatroom.find({
      where: {
        user1Id: {
          [Op.or]: [user1Id, user2Id]
        },
        user2Id: {
          [Op.or]: [user1Id, user2Id]
        }
      },
      include: [db.models.message],
      order: [[db.models.message, 'createdAt', 'DESC']]
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
          include: [db.models.message],
          order: [[db.models.message, 'createdAt', 'DESC']]
        }
      );
    }
  } catch (error) {
    console.log('Error!');
  }
};
module.exports = Chatroom;
