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

router.get('/:phone', async (req, res, next) => {
  try {
    //const user = await User.findByPk(req.params.userId)

    const user = await User.findOne({ where: { phone: req.params.phone } })
    res.json(user)
  } catch (err) {
    next(err)
  }
}
);

module.exports = router;
