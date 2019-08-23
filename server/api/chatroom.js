const router = require('express').Router();
const { Chatroom } = require('../db/models');
router.get('/', async (req, res, next) => {
  try {
    const chatrooms = await Chatroom.findAll({ include: [{ all: true }] });
    res.json(chatrooms);
  } catch (err) {
    next(err);
  }
});
router.get('/:chatrooId', async (req, res, next) => {
  try {
    const chatroom = await Chatroom.findOne(req.params.id);
    res.json(chatroom);
  } catch (err) {
    next(err);
  }
});
router.post('/create', async (req, res, next) => {
  try {
    const chatroom = await Chatroom.findOrCreateChat({
      userId1: req.body.userId1,
      userId2: req.body.userId2
    });
    res.json(chatroom);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
