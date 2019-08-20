const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/apartments', require('./apartments'));
// router.use('/user-apartment', require('./user-apartment'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
