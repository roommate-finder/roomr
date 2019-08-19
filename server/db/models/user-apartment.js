const Sequelize = require('sequelize');
const db = require('../db');

const UserApartment = db.define('user-apartment', {
  userId: { type: Sequelize.INTEGER },
  apartmentId: { type: Sequelize.INTEGER }
});

module.exports = UserApartment;
