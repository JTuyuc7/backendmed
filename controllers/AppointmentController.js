const Appointment = require('../models/Appointments');
const { validationResult } = require('express-validator');

exports.createAppointment = async (req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try {
        const appointment = new Appointment(req.body);
        appointment.save();
        res.status(200).json({ msg: 'Created correctly', appointment: appointment})
    } catch (error) {
        //console.log(error, 'Unable to create the appointment')
        res.status(500).json({msg: 'Unable to create the Appointment'})
    }
}

exports.getAllAppointments = async (req, res) => {

    try {
        const appointments = await Appointment.find().sort({ created: - 1})
        res.status(200).json({appointments: appointments })
    } catch (error) {
        console.log(error, 'Error while getting the appointments')
        res.status(500).json({msg: 'Something went wrong, try again later'})
    }
}

exports.getSingleAppointment = async (req, res) => {

    try {
        const appointment = await Appointment.findById(req.params.id)
        res.status(200).json(appointment)
    } catch (error) {
        console.log(error, 'From getting single appointment')
        res.status(500).json({msg: 'Unable to get the appointment details'})
    }
}

exports.updateAppointment = async (req, res) => {

    /* const { name, lastName, age, phone, description, date, } = req.body;
    const updateAppointment = {};
    if(name){
        updateAppointment.name = name;
    }
    if( lastName ){
        updateAppointment.lastName = lastName;
    }
    if(age){
        updateAppointment.age = age;
    }
    if( phone ){
        updateAppointment.phone = phone;
    }
    if(description){
        updateAppointment.description = description;
    }
    if( date ){
        updateAppointment.date = date;
    }
    console.log(updateAppointment, 'lo que se actualizara') */
    try {
        let appointment = await Appointment.findById(req.params.id)
        if(!appointment){
            res.status(400).json({msg: 'Unable to find the appointment with the given id'})
        }
        const { name, lastName, age, phone, description, date, } = req.body;
        let updateAppointment = {};
        updateAppointment.name = name || appointment.name;
        updateAppointment.lastName = lastName || appointment.lastName;
        updateAppointment.age = age || appointment.age
        updateAppointment.phone = phone || appointment.phone;
        updateAppointment.description = description || appointment.description;
        updateAppointment.date = date || appointment.date;

        appointment = await Appointment.findByIdAndUpdate({ _id: req.params.id}, { $set: updateAppointment}, { new: true});
        res.status(200).json({msg: 'Updated correctly', appointment: appointment })

    } catch (error) {
        console.log(error, 'from updating the appointment')
        res.status(500).json({msg: 'Unable to update the appointment, try again later'})
    }
}

exports.deleteAppointment = async (req, res) => {
    
    try {
        let appointment = await Appointment.findById(req.params.id);
        if(!appointment){
            res.status(404).json({msg: 'No appointment was found with the giving Id'})
        }
        await Appointment.findOneAndRemove({_id: req.params.id })
        res.status(200).json({msg: 'Appointment was removed correctly'})

    } catch (error) {
        console.log(error, 'from deleting appointment')
        res.status(500).json({msg: 'Somenthing went wrong, try again later'})
    }
}