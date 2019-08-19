const User = require('./user');
const Apartment = require('./apartment');
const UserApartment = require('./user-apartment');
User.belongsToMany(Apartment, { through: UserApartment });
Apartment.belongsToMany(User, { through: UserApartment });

module.exports = {
  User,
  Apartment,
  UserApartment
};
