const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Doctor = require('./doctor');

const Slot = sequelize.define('slot', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define a foreign key relationship between Appointment and Doctor
Slot.belongsTo(Doctor, { foreignKey: 'doctorId' });

module.exports = Slot;
