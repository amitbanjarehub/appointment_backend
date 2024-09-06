// routes/appointmentRoutes.js
const express = require("express");
const router = express.Router();

// Create a new form
router.post("/form_builder", async (req, res) => {
  const db = req.db;
  const forms = req.body; // Expecting an array of form data

  try {
    if (!Array.isArray(forms)) {
      return res.status(400).json({ error: "Expected an array of forms" });
    }

    // Inserting multiple forms into the collection
    const result = await db.collection("form_builder").insertMany(forms);

    // Send a custom message along with the status code 201
    res.status(201).json({
      message: "Form successfully created",
      forms: result.ops, // Return the inserted forms
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to create form",
      details: err.message,
    });
  }
});

// Get all forms
router.get("/form_builder", async (req, res) => {
  const db = req.db;
  try {
    const forms = await db.collection("form_builder").find({}).toArray();
    res.status(200).json(forms);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch forms" });
  }
});

router.get("/appointments", async (req, res) => {
  const db = req.db;
  try {
    const forms = await db.collection("appointment").find({}).toArray();
    res.status(200).json(forms);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch forms" });
  }
});

router.get("/availabilities", async (req, res) => {
  const db = req.db;
  try {
    const forms = await db.collection("availbility").find({}).toArray();
    res.status(200).json(forms);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch forms" });
  }
});
module.exports = router;
