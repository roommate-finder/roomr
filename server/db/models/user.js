const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
  phone: { type: Sequelize.INTEGER },
  password: { type: Sequelize.STRING },
  email: { type: Sequelize.STRING },
  photo: { type: Sequelize.STRING },
  bio: { type: Sequelize.TEXT },
  age: { type: Sequelize.INTEGER },
  gender: { type: Sequelize.ENUM('MALE', 'FEMALE') },
  job: { type: Sequelize.TEXT }
  // jobLocation: { type: Sequelize.TEXT },
  // budgetMin: { type: Sequelize.INTEGER },
  // budgetMax: { type: Sequelize.INTEGER },
  // currentLocation: { type: Sequelize.STRING },
  // language: { type: Sequelize.STRING },
  // hasCat: { type: Sequelize.BOOLEAN },
  // hasDog: { type: Sequelize.BOOLEAN },
  // allergicToCat: { type: Sequelize.BOOLEAN },
  // allergicToDog: { type: Sequelize.BOOLEAN },
  // nightOwl: { type: Sequelize.BOOLEAN },
  // earlyBird: { type: Sequelize.BOOLEAN },
  // smoker: { type: Sequelize.BOOLEAN },
  // maxCommuteDistance: { type: Sequelize.ENUM('1 MILE', '5 MILES', '10 MILES', '20 MILES', '30 MILES', '50 MILES') },
  // seekingApt: { type: Sequelize.BOOLEAN },
  // notificationsOn: { type: Sequelize.BOOLEAN },
  // prefersNightOwl: { type: Sequelize.BOOLEAN },
  // prefersEarlyBird: { type: Sequelize.BOOLEAN },
  // prefersNonsmoker: { type: Sequelize.BOOLEAN },
  // prefersAgeMin: { type: Sequelize.INTEGER },
  // prefersAgeMax: { type: Sequelize.INTEGER },
  // prefersLanguage: { type: Sequelize.ENUM('ENGLISH', 'SPANISH') },
  // prefersGender: { type: Sequelize.ENUM('MALE', 'FEMALE', 'NO PREFERENCE') }
});

module.exports = User;
