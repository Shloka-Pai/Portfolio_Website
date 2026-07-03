// Import the About model we created
const About = require('../models/About');

// ─────────────────────────────────────
// GET /api/about
// Fetch your about info
// ─────────────────────────────────────
const getAbout = async (req, res) => {
  try {
    // findOne() = get the first (and only) document in About collection
    const about = await About.findOne();

    // if no data exists yet, send 404
    if (!about) {
      return res.status(404).json({ message: 'About info not found' });
    }

    // send the data back as JSON
    res.status(200).json(about);

  } catch (error) {
    // if something breaks, send 500 (server error)
    res.status(500).json({ message: error.message });
  }
};

// ─────────────────────────────────────
// POST /api/about
// Create your about info
// ─────────────────────────────────────
const createAbout = async (req, res) => {
  try {
    // req.body = the data sent from the frontend/Postman
    const about = new About(req.body);

    // save it to MongoDB
    const saved = await about.save();

    // 201 = "Created successfully"
    res.status(201).json(saved);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─────────────────────────────────────
// PUT /api/about/:id
// Update your about info
// ─────────────────────────────────────
const updateAbout = async (req, res) => {
  try {
    // req.params.id = the id in the URL e.g. /api/about/64abc123
    // findByIdAndUpdate = find by id, update with req.body
    // { new: true } = return the UPDATED document, not the old one
    const updated = await About.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'About info not found' });
    }

    res.status(200).json(updated);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export all 3 functions so the route can use them
module.exports = { getAbout, createAbout, updateAbout };