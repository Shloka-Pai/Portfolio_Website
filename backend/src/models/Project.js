const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    subtitle: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      required: true
    },
    techStack: {
      type: [String],  // array of strings e.g. ["React", "Node", "MongoDB"]
      required: true
    },
    githubLink: {
      type: String,
      default: ''
    },
    liveLink: {
      type: String,    // deployed URL
      default: ''
    },
    image: {
      type: String,    // project screenshot URL
      default: ''
    },
    featured: {
      type: Boolean,   // true = show this project first
      default: false
    },
    order: {
      type: Number,    // controls display order
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;