const router = require('express').Router();
const { UserApartment } = require('../db/models');

router.get('/', async (req, res, next) => {
  try {
    const userApartments = await UserApartment.findAll();
    res.json(userApartments);
  } catch (err) {
    next(err);
  }
});

router.post('/create', async (req, res, next) => {
  try {
    const userApartment = await UserApartment.create({
      apartmentId: req.body.apartmentId,
      userId: req.body.userId,
      liked: req.body.liked
    });
    console.log('TCL: userApartment', userApartment);
    if (userApartment) {
      res.json(userApartment);
    } else {
      const err = new Error('Error creating new user apartment');
      err.status = 500;
      next(err);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
