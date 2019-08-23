const router = require('express').Router();
const { User } = require('../db/models');
const { Chatroom } = require('../db/models');
const Sequelize = require('sequelize');
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.put('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        phone: req.body.phone,
        password: req.body.password
      }
    });
    if (user) {
      res.json(user);
    } else {
      const err = new Error('Incorrect phone number or password');
      err.status = 401;
      next(err);
    }
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create({
      phone: req.body.phone,
      password: req.body.password
    });
    if (user) {
      res.json(user);
    } else {
      const err = new Error('Error creating new user');
      err.status = 500;
      next(err);
    }
  } catch (err) {
    next(err);
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    console.log('HERE');
    const user = await User.findByPk(req.params.userId);
    const userData = user.dataValues;
    const chatrooms = await Chatroom.findAll({
      where: {
        [Sequelize.Op.or]: [
          { user1Id: req.params.userId },
          { user2Id: req.params.userId }
        ]
      }
    });
    userData.chatrooms = chatrooms.map(chat => {
      return chat.dataValues;
    });
    res.json(userData);
  } catch (err) {
    next(err);
  }
});

// router.get('/:userId/chatroom', async (req, res, next) => {
//   try {
//     const user = await Chatroom.findAll({
//       where: {
//         userId: req.params.userId
//       },
//       include: [Chatroom]
//       // where: {
//       //   [Sequelize.Op.or]: [
//       //     { user1Id: req.params.userId },
//       //     { user2Id: req.params.userId }
//       //   ]
//       // }
//     });
//     res.json(user);
//   } catch (err) {
//     next(err);
//   }
// });
module.exports = router;
