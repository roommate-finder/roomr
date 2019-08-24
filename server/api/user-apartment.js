const router = require('express').Router();
const { UserApartment } = require('../db/models');
const client = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const userApartments = await UserApartment.findAll();
    res.json(userApartments);
  } catch (err) {
    next(err);
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    const matches = await client.query(`SELECT "user-liked"."apartmentId", "others-liked-same"."matches_array" FROM (SELECT "apartmentId" FROM "user-apartments" where "userId" = ${
      req.params.userId
    } and "liked" = TRUE) AS "user-liked" LEFT JOIN (SELECT "matches"."apartmentId", string_agg("matches"."userId"::text,', ') AS "matches_array" FROM
    (SELECT "liked-including-me"."apartmentId", "liked-including-me"."userId" FROM (
    SELECT "user-apartments"."userId", "user-apartments"."apartmentId", "user-apartments"."liked" FROM "user-apartments" INNER JOIN
    (SELECT "apartmentId" FROM "user-apartments" where "userId" = 1 and "liked" = TRUE) AS "liked-apartments"  ON  "user-apartments"."apartmentId" = "liked-apartments"."apartmentId") AS "liked-including-me" WHERE "liked-including-me"."liked" = TRUE AND "liked-including-me"."userId" <> ${
      req.params.userId
    }) AS "matches" GROUP BY 1
    ) AS "others-liked-same" ON "user-liked"."apartmentId" = "others-liked-same"."apartmentId"`);
    // console.log('MATCHES', matches);
    res.json(matches);
  } catch (err) {
    next(err);
  }
});

router.put('/delete', async (req, res, next) => {
  try {
    await UserApartment.destroy({
      where: {
        userId: req.body.userId,
        apartmentId: req.body.apartmentId
      }
    });
    res.sendStatus(200);
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
