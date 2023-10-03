// models/slot_bookings.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path as needed

const SlotBookings = sequelize.define('slot_bookings', {
  doctor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  start_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  end_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
},{
    tableName: 'slot_bookings',
    timestamps: false // Disable timestamps (createdAt, updatedAt)  
});

module.exports = SlotBookings;
