const Slot = require("../models/slot");
const moment = require('moment');
const intervalInMinutes = 30;

function generateTimeIntervals(startTime, endTime, intervalInMinutes) {
    const start = moment(startTime, 'HH:mm:ss');
    const end = moment(endTime, 'HH:mm:ss');
  
    const intervals = [];
    let currentIntervalStart = start.clone();
  
    while (currentIntervalStart.isBefore(end)) {
      const currentIntervalEnd = currentIntervalStart.clone().add(intervalInMinutes, 'minutes');
  
      // Ensure the interval end does not exceed the end time
      const intervalEnd = currentIntervalEnd.isBefore(end) ? currentIntervalEnd : end;
  
      intervals.push({
        start: currentIntervalStart.format('HH:mm:ss'),
        end: intervalEnd.format('HH:mm:ss')
      });
  
      currentIntervalStart = intervalEnd;
    }
  
    return intervals;
  }

exports.fetchSlotDatesByDoctor = async (req, res, next) => {
    const doctorId = req.params.doctorId;

    try {
        let allSlotDates = await Slot.findAll({
            where: {
                doctorId: doctorId,
            },
            group: [
                ["date"]
            ],
            attributes: [
                "date"
            ],
            raw: true,
        });

        allSlotDates = allSlotDates.map((slotDateItem) => slotDateItem?.date);

        res.send(allSlotDates);

    } catch (error) {
        console.error('Error :', error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

exports.fetchSlotTimesByDoctorByDate = async (req, res, next) => {
    const doctorId = req.params.doctorId;
    const slotDate = req.params.slotDate;

    console.log(slotDate)

    try {
        let allSlotTimes = await Slot.findAll({
            where: {
                doctorId: doctorId,
                date: slotDate
            },
            attributes: [
                "start_time",
                "end_time",
            ],
            raw: true,
        });

        let generatedTimeSlots = [];
        allSlotTimes.forEach((timeSlotItem) => {
            const timeIntervals = generateTimeIntervals(timeSlotItem.start_time, timeSlotItem.end_time, intervalInMinutes);
            console.log(timeIntervals)
            generatedTimeSlots.push(...timeIntervals);

        })

        res.send(generatedTimeSlots);

    } catch (error) {
        console.error('Error :', error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}
