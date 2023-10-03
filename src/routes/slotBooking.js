const express = require('express');
const router = express.Router();
const { bookSlotForUser } = require('../controllers/slotBooking');

router.post('/book-slot', bookSlotForUser);
// router.get('/fetch-slot-times-by-doctor-and-date/:doctorId/:slotDate', fetchSlotTimesByDoctorByDate);

module.exports = router;