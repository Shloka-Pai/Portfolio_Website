const express = require('express');
const router = express.Router();
const { getSkills, createSkill, updateSkill, deleteSkill } = require('../controllers/skillController');

router.get('/', getSkills);           // GET /api/skills
router.post('/', createSkill);        // POST /api/skills
router.put('/:id', updateSkill);      // PUT /api/skills/:id
router.delete('/:id', deleteSkill);   // DELETE /api/skills/:id

module.exports = router;