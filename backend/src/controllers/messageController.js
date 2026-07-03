const Message = require('../models/Message');

// GET all messages (for you to read)
const getMessages = async (req, res) => {
  try {
    // sort by newest first
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST send a message (contact form)
const createMessage = async (req, res) => {
  try {
    const message = new Message(req.body);
    const saved = await message.save();
    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT mark message as read
const markAsRead = async (req, res) => {
  try {
    const updated = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Message not found' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE a message
const deleteMessage = async (req, res) => {
  try {
    const deleted = await Message.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Message not found' });
    res.status(200).json({ message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMessages, createMessage, markAsRead, deleteMessage };