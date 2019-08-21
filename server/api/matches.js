const router = require('express').Router();
const { Match } = require('../db/models');

router.get('/', async (req, res, next) => {
  try {
    const matches = await Match.findAll();
    res.json(matches);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const match = await Match.findOne(req.params.id);
    res.json(match);
  } catch (err) {
    next(err);
  }
});

router.post('/create', async (req, res, next) => {
  try {
    const match = await Match.create({
      userId1: req.body.userId1,
      userId2: req.body.userId2
    });
    res.json(match);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
