const express = require('express');
const router = express.Router();
const { fetchDoctorList, fetchDoctorAppointmentList } = require('../controllers/doctor.controller');

router.get('/list/:doctorId', fetchDoctorList);
router.get('/list', fetchDoctorList);
router.get('/appointment-list/:doctorId', fetchDoctorAppointmentList);

module.exports = router;