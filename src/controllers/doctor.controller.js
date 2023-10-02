const Doctor = require("../models/doctor");

exports.fetchDoctorList = async (req, res, next) => {
    
    try {
        const doctorId = req.params.doctorId;

        let whereCondition = {};

        if(doctorId) {
            whereCondition = {
                id: doctorId,
            }
        }

        const allDoctors = await Doctor.findAll({
            where: whereCondition,
        });

        res.send(allDoctors);

    } catch (error) {
        console.error('Error :', error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

exports.fetchDoctorAppointmentList = async (req, res, next) => {

    try {
        const doctorId = req.params.doctorId;
        console.log(doctorId);
        const DoctorInfo = await Doctor.findOne({
            where: {
                id: doctorId,
            }
        });

        res.send(DoctorInfo);

    } catch (error) {
        console.error('Error :', error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}