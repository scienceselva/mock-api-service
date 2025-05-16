const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'username', 'password', {
  host: 'url',
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;
