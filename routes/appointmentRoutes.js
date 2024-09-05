// routes/appointmentRoutes.js
const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const Availability = require("../models/Availability");

// Get all appointments
router.get("/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    // console.log("mydata:",appointments);
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new appointment
router.post("/appointments", async (req, res) => {
  const newAppointment = new Appointment({
    name: req.body.name,
    date: req.body.date,
    time: req.body.time,
  });

  try {
    const savedAppointment = await newAppointment.save();
    res.status(201).json(savedAppointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get an appointment by ID
router.get("/appointments/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment)
      return res.status(404).json({ message: "Appointment not found" });
    res.status(200).json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update an appointment
router.put("/appointments/:id", async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedAppointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete an appointment
router.delete("/appointments/:id", async (req, res) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(
      req.params.id
    );
    res.status(200).json({ message: "Appointment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all availability data
router.get("/availabilities", async (req, res) => {
  try {
    const availabilities = await Availability.find();
    console.log("mydata_availabilities:",availabilities);
    res.status(200).json(availabilities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get availability by adminId
router.get("/availabilities/:adminId", async (req, res) => {
  try {
    const availability = await Availability.findOne({
      adminId: req.params.adminId,
    });
    if (!availability) {
      return res.status(404).json({ message: "Availability not found" });
    }
    res.status(200).json(availability);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new availability entry
router.post("/availabilities", async (req, res) => {
  const newAvailability = new Availability({
    adminId: req.body.adminId,
    availability: req.body.availability,
  });

  try {
    const savedAvailability = await newAvailability.save();
    res.status(201).json(savedAvailability);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update availability by adminId
router.put("/availabilities/:adminId", async (req, res) => {
  try {
    const updatedAvailability = await Availability.findOneAndUpdate(
      { adminId: req.params.adminId },
      req.body,
      { new: true }
    );
    if (!updatedAvailability) {
      return res.status(404).json({ message: "Availability not found" });
    }
    res.status(200).json(updatedAvailability);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete availability by adminId
router.delete("/availabilities/:adminId", async (req, res) => {
  try {
    const deletedAvailability = await Availability.findOneAndDelete({
      adminId: req.params.adminId,
    });
    if (!deletedAvailability) {
      return res.status(404).json({ message: "Availability not found" });
    }
    res.status(200).json({ message: "Availability deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
