// app.js or index.js
const express = require("express");
const cors = require("cors");
const connectToMongoDB = require("./connection/db/mongoConnection");
const appointmentRoutes = require("./routes/appointmentRoutes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

async function startServer() {
  const db = await connectToMongoDB(); // Connect to MongoDB and get the db instance

  if (!db) {
    console.error("Failed to connect to MongoDB");
    process.exit(1);
  } else {
    console.log("MongoDB connection established successfully");
  }

  app.get("/", (req, res) => {
    res.send("Backend is connected to the MongoDB database!");
  });

  // Attach the db to req object and pass it to routes
  app.use(
    "/api",
    (req, res, next) => {
      req.db = db;
      next();
    },
    appointmentRoutes
  ); // You can use routes as middleware

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer(); // Start the server after MongoDB is connected
