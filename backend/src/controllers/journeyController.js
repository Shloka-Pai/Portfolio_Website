const Journey = require('../models/Journey');

// GET all journey items (sorted by order)
const getJourney = async (req, res) => {
  try {
    const journey = await Journey.find().sort({ order: 1 });
    res.status(200).json(journey);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET journey items by type (education/experience/certificate)
const getJourneyByType = async (req, res) => {
  try {
    // req.params.type = the type in URL e.g. /api/journey/type/education
    const journey = await Journey.find({ type: req.params.type }).sort({ order: 1 });
    res.status(200).json(journey);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST create a journey item
const createJourney = async (req, res) => {
  try {
    const journey = new Journey(req.body);
    const saved = await journey.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT update a journey item
const updateJourney = async (req, res) => {
  try {
    const updated = await Journey.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Journey item not found' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE a journey item
const deleteJourney = async (req, res) => {
  try {
    const deleted = await Journey.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Journey item not found' });
    res.status(200).json({ message: 'Journey item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getJourney, getJourneyByType, createJourney, updateJourney, deleteJourney };