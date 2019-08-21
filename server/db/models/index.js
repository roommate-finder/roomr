const User = require('./user');
const Apartment = require('./apartment');
const UserApartment = require('./user-apartment');
const Photo = require('./photo');

User.belongsToMany(Apartment, { through: UserApartment });
Apartment.belongsToMany(User, { through: UserApartment });
Photo.belongsTo(Apartment);
// Apartment.belongsToMany(Photo);
Apartment.hasMany(Photo)
module.exports = {
  User,
  Apartment,
  UserApartment,
  Photo
};
