const appointmentRoutes = require("./routes/appointmentRoutes");


// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse incoming JSON requests

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Basic route
app.get("/", (req, res) => {
  res.send("Backend is connected to the MongoDB database!");
});

app.use("/api", appointmentRoutes);




// Listen on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
