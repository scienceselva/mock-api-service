const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const MockApi = sequelize.define('MockApi', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.STRING(8), allowNull: false },
  method: { type: DataTypes.STRING, allowNull: false },
  path: { type: DataTypes.STRING, allowNull: false },
  queryParams: { type: DataTypes.STRING }, // JSON stringified
  requestBody: { type: DataTypes.JSONB },
  responseBody: { type: DataTypes.JSONB, allowNull: false },
}, {
  indexes: [
    { unique: true, fields: ['method', 'path', 'queryParams'] },
  ],
});

module.exports = MockApi;
