const router = require('express').Router();
const config = require('../../twilio/config');

const client = require('twilio')(config.accountSid, config.authToken);

router.post('/', async (req, res, next) => {
  try {
    client.messages
      .create({
        body: `${req.body.user1.firstName}  ${
          req.body.user1.lastName
        } started a chat with you to discuss ${
          req.body.apartmentName
        }. Check your messages in the roomr app!`,
        from: '+12489757458',
        to: `${req.body.user2.phone}`
      })
      .then(message => console.log(message.sid))
      .done();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
