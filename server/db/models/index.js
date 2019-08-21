const db = require('../db');
const User = require('./user');
const Apartment = require('./apartment');
const UserApartment = require('./user-apartment');
const Chatroom = require('./chatroom');

User.belongsToMany(Apartment, { through: UserApartment });
Apartment.belongsToMany(User, { through: UserApartment });
User.hasMany(Chatroom);

module.exports = {
  db,
  User,
  Apartment,
  UserApartment,
  Chatroom
};
