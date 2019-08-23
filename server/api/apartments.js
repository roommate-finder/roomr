const router = require('express').Router();
const { Apartment, UserApartment, User, Photo } = require('../db/models/');
const client = require("../db");

router.get('/', async (req, res, next) => {
  try {
    const apartments = await Apartment.findAll({ include: [{ all: true }] });
    res.json(apartments);
  } catch (err) {
    next(err);
  }
});

router.get('/:apartmentId', async (req, res, next) => {
  try {
    const apartment = await Apartment.findByPk(req.params.apartmentId);
    res.json(apartment);
  } catch (err) {
    next(err);
  }
});

router.get('/show/:userId', async (req, res, next) => {
  try {
    console.log("-------------REQ PARAMS", req.params)
    //const seenApartments = await Apartment.findAll({ include: [User, { model: Photo, include: [Apartment] }] })
    const unseenApartments = await client.query(`SELECT * FROM "apartments" INNER JOIN (SELECT "id" FROM "apartments" EXCEPT (SELECT "apartmentId" FROM "user-apartments" WHERE  "userId"=${Number(req.params.userId)})) as "unseen-apartments" ON "apartments"."id" = "unseen-apartments"."id" JOIN "photos" ON "photos"."apartmentId" = "apartments"."id"`)
    console.log("UNSEEN APTS", unseenApartments[0])

    const apt = unseenApartments[0]
    const clean = []
    for (let i = 0; i < apt.length; i++) {
      let found = false;
      for (let j = 0; j < clean.length; j++) {
        if (clean[j].id === apt[i].apartmentId) {
          clean[j].photos.push({ url: apt[i].url })
          found = true
          break;
        }
      }
      if (!found) {
        clean.push({
          id: apt[i].apartmentId,
          name: apt[i].name,
          address: apt[i].address,
          unit: apt[i].unit,
          city: apt[i].city,
          state: apt[i].state,
          zip: apt[i].zip,
          description: apt[i].description,
          numBedrooms: apt[i].numBedrooms,
          numBathrooms: apt[i].numBathrooms,
          squareFeet: apt[i].squareFeet,
          monthlyRent: apt[i].monthlyRent,
          latitude: apt[i].latitude,
          longitude: apt[i].longitude,
          neighborhood: apt[i].neighborhood,
          createdAt: apt[i].createdAt,
          updatedAt: apt[i].updatedAt,
          photos: [{ url: apt[i].url }]
        })
      }
    }
    res.json(clean)
    // res.json(unseenApartments[0])
  } catch (err) {
    next(err)
  }
})

module.exports = router;
