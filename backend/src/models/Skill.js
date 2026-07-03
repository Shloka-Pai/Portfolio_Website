const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,       // e.g. "React", "Node.js", "MongoDB"
      required: true,
      trim: true
    },
    category: {
      type: String,
      enum: ['frontend', 'backend', 'database', 'tools', 'languages'],
      // category helps group skills on the frontend
      required: true
    },
    icon: {
      type: String,       // URL to skill icon/logo
      default: ''
    },
    proficiency: {
      type: Number,       // 1 to 5 (how good you are)
      min: 1,
      max: 5,
      default: 3
    },
    order: {
      type: Number,       // display order
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;