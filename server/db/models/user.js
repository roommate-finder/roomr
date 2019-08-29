const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
  phone: { type: Sequelize.BIGINT },
  password: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('password');
    }
  },
  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('salt');
    }
  },
  email: { type: Sequelize.STRING },
  photo: { type: Sequelize.STRING },
  bio: { type: Sequelize.TEXT },
  age: { type: Sequelize.INTEGER },
  gender: { type: Sequelize.ENUM('MALE', 'FEMALE', 'OTHER') },
  job: { type: Sequelize.TEXT },
  hasCat: { type: Sequelize.BOOLEAN },
  hasDog: { type: Sequelize.BOOLEAN },
  allergicToCat: { type: Sequelize.BOOLEAN },
  allergicToDog: { type: Sequelize.BOOLEAN },
  // jobLocation: { type: Sequelize.TEXT },
  // budgetMin: { type: Sequelize.INTEGER },
  // budgetMax: { type: Sequelize.INTEGER },
  // currentLocation: { type: Sequelize.STRING },
  // language: { type: Sequelize.STRING },

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

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password();
};

/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex');
};

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password(), user.salt());
  }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword);
});
