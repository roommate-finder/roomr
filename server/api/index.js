const pg = require('pg');
const client = new pg.Client('postgres://localhost/roomr');
client.connect();
const router = require('express').Router();
(module.exports = router), client;

router.use('/users', require('./users'));
router.use('/apartments', require('./apartments'));
router.use('/user-apartment', require('./user-apartment'));
router.use('/photos', require('./photos'));
router.use('/chatroom', require('./chatroom'));
router.use('/twilio', require('./twilio'));
router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
