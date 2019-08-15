const router = require('express').Router();
const { Apartment } = require('../db/models/');

router.get('/', async (req, res, next) => {
  try {
    const apartments = await Apartment.findAll();
    console.log(apartments);
    res.json(apartments);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
