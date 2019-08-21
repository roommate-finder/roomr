const db = require('../db');
const User = require('./user');
const Apartment = require('./apartment');
const UserApartment = require('./user-apartment');
const Chatroom = require('./chatroom');

User.belongsToMany(Apartment, { through: UserApartment });
Apartment.belongsToMany(User, { through: UserApartment });
User.belongsToMany(User, {
  through: 'chatroom',
  as: 'user1',
  foreignKey: 'user1'
});
User.belongsToMany(User, {
  through: 'chatroom',
  as: 'user2',
  foreignKey: 'user2'
});
module.exports = {
  db,
  User,
  Apartment,
  UserApartment,
  Chatroom
};
