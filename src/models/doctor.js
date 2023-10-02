const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Doctor = sequelize.define('Doctor', {
  doctor_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  experience: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  specialization: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'doctors',
  timestamps: false // Disable timestamps (createdAt, updatedAt)
});

module.exports = Doctor;
