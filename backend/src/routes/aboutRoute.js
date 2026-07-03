// express.Router() = mini router for this section
const express = require('express');
const router = express.Router();

// import the controller functions
const { getAbout, createAbout, updateAbout } = require('../controllers/aboutController');

// define which function handles which URL + method
router.get('/', getAbout);        // GET  /api/about
router.post('/', createAbout);    // POST /api/about
router.put('/:id', updateAbout);  // PUT  /api/about/:id

// export the router
module.exports = router;