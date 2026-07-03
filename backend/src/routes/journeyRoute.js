const express = require('express');
const router = express.Router();
const {
  getJourney,
  getJourneyByType,
  createJourney,
  updateJourney,
  deleteJourney
} = require('../controllers/journeyController');

router.get('/', getJourney);                    // GET /api/journey
router.get('/type/:type', getJourneyByType);    // GET /api/journey/type/education
router.post('/', createJourney);                // POST /api/journey
router.put('/:id', updateJourney);              // PUT /api/journey/:id
router.delete('/:id', deleteJourney);           // DELETE /api/journey/:id

module.exports = router;