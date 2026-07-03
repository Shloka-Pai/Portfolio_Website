const express = require('express');
const router = express.Router();
const { getMessages, createMessage, markAsRead, deleteMessage } = require('../controllers/messageController');

router.get('/', getMessages);           // GET /api/contact
router.post('/', createMessage);        // POST /api/contact
router.put('/:id', markAsRead);         // PUT /api/contact/:id
router.delete('/:id', deleteMessage);   // DELETE /api/contact/:id

module.exports = router;