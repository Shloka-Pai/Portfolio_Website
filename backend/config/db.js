// Import mongoose — our tool to talk to MongoDB
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Try to connect using the URI from .env
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // If successful, log the host name
    console.log(`MongoDB Connected: ${conn.connection.host}`);

  } catch (error) {
    // If it fails, log the error and stop the program
    console.error(`Error: ${error.message}`);
    process.exit(1); // 1 means "exited with failure"
  }
};

// Export so server.js can use it
module.exports = connectDB;

