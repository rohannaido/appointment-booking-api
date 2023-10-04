const Slot = require("../models/slot");
const moment = require('moment');
const SlotBookings = require("../models/slot_booking");
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
            generatedTimeSlots.push(...timeIntervals);
        })

        let doctorBookedSlots = await SlotBookings.findAll({
            where: {
                doctor_id: doctorId,
                date: slotDate,
            },
            attributes: [
                ["start_time", "start"],
                ["end_time", "end"],
            ],
            raw: true,
        })

        let finalSlots = []

        generatedTimeSlots.forEach((genSlot) => {
            // Filtering out booked slots
            let getSlot = doctorBookedSlots.find((item) => (item.start == genSlot.start && item.end == genSlot.end))
            if(!getSlot){
                finalSlots.push(genSlot);
            }
        })

        res.send(finalSlots);

    } catch (error) {
        console.error('Error :', error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}
