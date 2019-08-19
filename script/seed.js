'use strict';

const db = require('../server/db');
const { User, Apartment } = require('../server/db/models');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const users = await Promise.all([
    User.create({
      firstName: 'Cody',
      lastName: 'Codes',
      phone: 1234567,
      email: 'cody@email.com',
      photo: 'https://robohash.org/cody',
      bio: 'i love to code',
      age: '18',
      gender: 'MALE',
      job: 'fullstack developer'
    }),
    User.create({
      firstName: 'Joey',
      lastName: 'Doe',
      phone: 7654321,
      email: 'joey@email.com',
      photo: 'https://robohash.org/joey',
      bio: 'cool dog looking for a nice place to live',
      age: '21',
      gender: 'MALE',
      job: 'sprinter'
    }),
    User.create({
      firstName: 'Rocky',
      lastName: 'Smith',
      phone: 1112222,
      email: 'rockyrocks@email.com',
      photo: 'https://robohash.org/rocky',
      bio: 'rock enthusiast',
      age: '24',
      gender: 'MALE',
      job: 'mailman'
    }),
    User.create({
      firstName: 'Baxter',
      lastName: 'Harris',
      phone: 1232222,
      email: 'baxter@email.com',
      photo: 'https://robohash.org/baxter',
      bio: 'a good boy',
      age: '24',
      gender: 'MALE',
      job: 'mall cop'
    }),
    User.create({
      firstName: 'Felix',
      lastName: 'Martin',
      phone: 1389798,
      email: 'jack@email.com',
      photo: 'https://robohash.org/jack',
      bio: 'cool cat',
      age: '24',
      gender: 'MALE',
      job: 'chef'
    })
  ]);
  const apartments = await Promise.all([
    Apartment.create({
      name: 'The Maynard at 2545 W Fitch',
      address: '2545 W Fitch Ave',
      latitude: 42.010998,
      longitude: -87.694581,
      unit: '108',
      city: 'Chicago',
      state: 'IL',
      zip: 606045,
      description:
        "Lorem ipsum dolor amet beard tousled glossier hella cred PBR&B next level pitchfork crucifix schlitz yr you probably haven't heard of them meditation lo-fi lyft. Edison bulb echo park snackwave venmo food truck tofu mlkshk XOXO PBR&B gluten-free letterpress schlitz salvia.",
      numBedrooms: 1,
      numBathrooms: 1,
      squareFeet: 500,
      monthlyRent: 950
    }),
    Apartment.create({
      name: '415 Premier',
      address: '415 W Howard St',
      latitude: 42.019565,
      longitude: -87.674722,
      unit: 'B2',
      city: 'Evanston',
      state: 'IL',
      zip: 60202,
      description:
        'Poutine enamel pin selvage DIY waistcoat readymade shaman chartreuse. Godard +1 selvage chartreuse gochujang unicorn cornhole tumeric vape live-edge synth pitchfork affogato edison bulb.',
      numBedrooms: 2,
      numBathrooms: 2,
      squareFeet: 1149,
      monthlyRent: 1848
    }),
    Apartment.create({
      name: 'MILA',
      address: '201 N Garland Ct',
      latitude: 41.886093,
      longitude: -87.624904,
      unit: '07',
      city: 'Chicago',
      state: 'IL',
      zip: 60601,
      description:
        'Unicorn tote bag disrupt salvia locavore pabst biodiesel vaporware beard. Mustache offal tbh succulents, man braid hoodie snackwave synth tumblr.',
      numBedrooms: 2,
      numBathrooms: 2,
      squareFeet: 1107,
      monthlyRent: 3284
    }),
    Apartment.create({
      name: '1000 South Clark',
      address: '1000 S Clark St',
      latitude: 41.869538,
      longitude: -87.631092,
      unit: '13',
      city: 'Chicago',
      state: 'IL',
      zip: 60605,
      description:
        'Fashion axe echo park food truck twee hella, try-hard irony. Echo park yr listicle tousled freegan, marfa pitchfork mustache sartorial vinyl wayfarers trust fund put a bird on it pabst.',
      numBedrooms: 1,
      numBathrooms: 1,
      squareFeet: 645,
      monthlyRent: 2149
    }),
    Apartment.create({
      name: 'K2 Apartments',
      address: '365 N Halsted St',
      latitude: 41.888821,
      longitude: -87.647103,
      unit: 'P03',
      city: 'Chicago',
      state: 'IL',
      zip: 60661,
      description:
        'Vegan brooklyn meditation flannel, gochujang kale chips humblebrag succulents listicle XOXO ennui.',
      numBedrooms: 3,
      numBathrooms: 3,
      squareFeet: 1494,
      monthlyRent: 4550
    })
  ]);

  console.log(`seeded ${apartments.length} apartments`);
  console.log(`seeded ${users.length} users`);
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
