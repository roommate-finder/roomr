const pg = require('pg');
const client = new pg.Client('postgres://localhost/roomr');
client.connect();
const router = require('express').Router();
(module.exports = router), client;

router.use('/users', require('./users'));
router.use('/apartments', require('./apartments'));
router.use('/user-apartment', require('./user-apartment'));
router.use('/matches', require('./matches'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
