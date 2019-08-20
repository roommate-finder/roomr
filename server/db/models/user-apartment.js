const Sequelize = require('sequelize');
const db = require('../db');

const UserApartment = db.define('user-apartment', {
  userId: { type: Sequelize.INTEGER },
  apartmentId: { type: Sequelize.INTEGER },
  liked: { type: Sequelize.BOOLEAN }
});

module.exports = UserApartment;
