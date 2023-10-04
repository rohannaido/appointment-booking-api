const express = require('express');
const router = express.Router();
const { bookSlotForUser, fetchBookingsByUser } = require('../controllers/slotBooking');

router.post('/book-slot', bookSlotForUser);
router.get('/fetch-bookings-by-user', fetchBookingsByUser);
// router.get('/fetch-slot-times-by-doctor-and-date/:doctorId/:slotDate', fetchSlotTimesByDoctorByDate);

module.exports = router;