const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/AppointmentController');
const { check } = require('express-validator');

// Get all appointments
router.get('/',
    appointmentController.getAllAppointments
);

router.get('/:id',
    appointmentController.getSingleAppointment
)

// Create new appointment
router.post("/",
    [
        check('name', 'Please enter a patient name').not().isEmpty(),
        check('lastName', 'Last name is required').not().isEmpty(),
        check('age', 'Enter a valid age').isNumeric(),
        check('phone', 'Enter a valid contact number').isNumeric().isLength({min: 8}),
        check('description', 'Enter a valid description').not().isEmpty(),
        check('date', 'Select a valid date').not().isEmpty()
    ],
    appointmentController.createAppointment 
)

// Update appointment
router.put('/:id',
    [
        check('name', 'Please enter a patient name').not().isEmpty(),
        check('lastName', 'Last name is required').not().isEmpty(),
        check('age', 'Enter a valid age').isNumeric(),
        check('phone', 'Enter a valid contact number').isNumeric().isLength({min: 8}),
        check('description', 'Enter a valid description').not().isEmpty(),
        check('date', 'Select a valid date').not().isEmpty()
    ],
    appointmentController.updateAppointment
)

// Remove an appointment
router.delete('/:id',
    appointmentController.deleteAppointment
)


module.exports = router;