const SlotBookings = require("../models/slot_booking");
const moment = require('moment');

exports.bookSlotForUser = async (req, res, next) => {
    try {

        const { doctorId, date, startTime, endTime } = req.body;

        const userId = req.user.userId;

        const createSlotBooking = await SlotBookings.create({
            doctor_id: doctorId,
            user_id: userId,
            date,
            start_time: startTime,
            end_time: endTime,
        })

        res.send("Booked slot successfully!");

    } catch (error) {
        console.error('Error :', error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

exports.fetchBookingsByUser = async (req, res, next) => {
    try {

        const userId = req.user.userId;

        const userSlotBookings = await SlotBookings.findAll({
            user_id: userId,
        })

        console.log(userSlotBookings)

        res.send(userSlotBookings);

    } catch (error) {
        console.error('Error :', error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}