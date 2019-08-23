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
router.put('/:userId', async (req, res, next) => {
  try {
    console.log('INSIDE PUT REQ');
    const userToEdit = await User.findByPk(Number(req.params.userId));
    const user = await userToEdit.update(req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
});
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
