// 1. Import packages
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db'); // 👈 import the functiononly after connecting database

// 2. Load the .env file so we can use process.env.PORT etc.
dotenv.config();

// 3. Create the express app
const app = express();

connectDB();

// 4. Middleware — things that run on EVERY request
app.use(cors());              // Allow frontend (React) to talk to this server
app.use(express.json());      // Allow server to read JSON from request body

//5. A test route — just to confirm the server works
app.get('/', (req, res) => {
  res.send('Portfolio API is running');
});

// 6. Read the PORT from .env (or use 5000 as fallback)
const PORT = process.env.PORT || 5000;

// 7. Start the server — listen for incoming requests
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
