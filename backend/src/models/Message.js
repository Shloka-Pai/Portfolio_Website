const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    message: {
      type: String,
      required: true
    },
    read: {
      type: Boolean,   // false = new message, true = you've read it
      default: false
    }
  },
  {
    timestamps: true   // createdAt tells you when they messaged you
  }
);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;