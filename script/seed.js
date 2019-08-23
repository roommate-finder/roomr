'use strict';

const db = require('../server/db');
const { User, Apartment, Photo, UserApartment } = require('../server/db/models');
const csv = require('csv-parser')
const fs = require('fs')
const path = require('path');

const apartments = [];
const apartmentData = path.join(__dirname, 'apartment_data.csv');
fs.createReadStream(apartmentData)
  .pipe(csv())
  .on('data', (data) => apartments.push(data))
  .on('end', () => {
    console.log(apartments);
  });

const photos = []
const photoData = path.join(__dirname, 'photo_data.csv')
fs.createReadStream(photoData)
  .pipe(csv())
  .on('data', (data) => photos.push(data))
  .on('end', () => {
    console.log(photos);
  });

const users = []
const userData = path.join(__dirname, 'user_data.csv')
fs.createReadStream(userData)
  .pipe(csv())
  .on('data', (data) => users.push(data))
  .on('end', () => {
    console.log(users)
  })

const userApartments = []
const userApartmentData = path.join(__dirname, 'user_apartment_data.csv')
fs.createReadStream(userApartmentData)
  .pipe(csv())
  .on('data', (data) => userApartments.push(data))
  .on('end', () => {
    console.log(userApartments);
  });

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const createUsers = []
  users.forEach(user => createUsers.push(User.create(user)))
  await Promise.all(createUsers)

  const createApartments = []
  apartments.forEach(apt => createApartments.push(Apartment.create(apt)))
  await Promise.all(createApartments)

  const createPhotos = []
  photos.forEach(photo => createPhotos.push(Photo.create(photo)))
  await Promise.all(createPhotos)

  const createUserApartments = []
  userApartments.forEach(ua => createUserApartments.push(UserApartment.create(ua)))
  await Promise.all(createUserApartments)


  // console.log(`seeded ${apartments.length} apartments`);
  // console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
