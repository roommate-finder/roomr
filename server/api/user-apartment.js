const router = require('express').Router();
const { UserApartment } = require('../db/models');

router.post('/create', async (req, res, next) => {
  try {
    const userApartment = await UserApartment.create({
      userId: req.body.userId,
      apartmentId: req.body.apartmentId
    });
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