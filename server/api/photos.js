const router = require('express').Router();
const { Photo } = require('../db/models/');

router.get('/', async (req, res, next) => {
    try {
        const photos = await Photo.findAll({ include: [{ all: true }] });
        res.json(photos);
    } catch (err) {
        next(err);
    }
});


module.exports = router;
