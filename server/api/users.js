const router = require('express').Router();
const { User } = require('../db/models');

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    const user = awaitUser.findByPk(req.params.userId)
    res.json(user)
  } catch (err) {
    next(err)
  }
}
);

module.exports = router;
