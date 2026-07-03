// 1. Import packages
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./src/config/db'); // 👈 import the functiononly after connecting database

// import all routes
const aboutRoute = require('./src/routes/aboutRoute');
const journeyRoute = require('./src/routes/journeyRoute');
const projectRoute = require('./src/routes/projectRoute');
const skillRoute = require('./src/routes/skillRoute');
const messageRoute = require('./src/routes/messageRoute');

// 2. Load the .env file so we can use process.env.PORT etc.
//in easy words we ahve a file .env and it contains simple text file 
//the nodejs does not automatically come to know that this is out port or this is mongodb url 
//so the .config helps to read the .env
dotenv.config();

// 3. Create the express app
//Without express(), you'd have to manually write code to:
//Parse raw HTTP requests
//Figure out the URL path yourself
//Handle different request methods (GET, POST, etc.) manually
//Manage headers, status codes, etc.
const app = express();

connectDB();

// 4. Middleware — things that run on EVERY request
app.use(cors());              // Allow frontend (React) to talk to this server
app.use(express.json());      // Allow server to read JSON from request body

//5. A test route — just to confirm the server works
app.get('/', (req, res) => {
  res.send('Portfolio API is running');
});

// all API routes
app.use('/api/about', aboutRoute);
app.use('/api/journey', journeyRoute);
app.use('/api/projects', projectRoute);
app.use('/api/skills', skillRoute);
app.use('/api/contact', messageRoute);

// 6. Read the PORT from .env (or use 5000 as fallback)
//using || is necessary as when we deploy our application then it can run on any server not jut 5000
const PORT = process.env.PORT || 5000;

// 7. Start the server — listen for incoming requests
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
