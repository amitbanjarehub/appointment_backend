// mongoConnection.js
const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5s
});

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("appointmentSystem"); // Change the database name as needed
    return db;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); // Exit the process if there's a connection error
  }
}

module.exports = connectToMongoDB;
