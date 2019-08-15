const User = require('./user');
const Apartment = require('./apartment');

// User.hasMany(Apartment)
// Apartment.belongsToMany(User)

module.exports = {
  User,
  Apartment
};
