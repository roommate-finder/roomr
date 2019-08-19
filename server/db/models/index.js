const User = require('./user');
const Apartment = require('./apartment');

User.belongsToMany(Apartment, { through: 'user-apartment' });
Apartment.belongsToMany(User, { through: 'user-apartment' });

module.exports = {
  User,
  Apartment
};
