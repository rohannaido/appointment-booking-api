const express = require('express');
const router = express.Router();
const { fetchSlotDatesByDoctor, fetchSlotTimesByDoctorByDate } = require('../controllers/slot.controller');

router.get('/fetch-slot-dates-by-doctor/:doctorId', fetchSlotDatesByDoctor);
router.get('/fetch-slot-times-by-doctor-and-date/:doctorId/:slotDate', fetchSlotTimesByDoctorByDate);

module.exports = router;