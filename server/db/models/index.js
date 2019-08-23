const User = require('./user');
const Apartment = require('./apartment');
const UserApartment = require('./user-apartment');
const Chatroom = require('./chatroom');
const Photo = require('./photo');
User.belongsToMany(Apartment, { through: UserApartment });
Apartment.belongsToMany(User, { through: UserApartment });
User.belongsToMany(User, {
  through: 'chatroom',
  as: 'user1',
  foreignKey: 'user1Id'
});
User.belongsToMany(User, {
  through: 'chatroom',
  as: 'user2',
  foreignKey: 'user2Id'
});

Photo.belongsTo(Apartment);
// Apartment.belongsToMany(Photo);
Apartment.hasMany(Photo);
module.exports = {
  User,
  Apartment,
  UserApartment,
  Chatroom,
  Photo
};
