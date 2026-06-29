// Import mongoose to create a schema
const mongoose = require('mongoose');

// Schema = the shape/structure of your data
const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,       // must be text
      required: true,     // cannot be empty
      trim: true          // removes extra spaces
    },
    description: {
      type: String,
      required: true
    },
    techStack: {
      type: [String],     // array of strings e.g. ["React", "Node"]
      required: true
    },
    githubLink: {
      type: String,
      default: ''         // if not provided, defaults to empty string
    },
    liveLink: {
      type: String,
      default: ''
    },
    image: {
      type: String,       // we'll store image URL as text
      default: ''
    }
  },
  {
    timestamps: true      // auto adds createdAt and updatedAt fields
  }
);

// Create the model from the schema
const Project = mongoose.model('Project', projectSchema);

// Export so routes can use it
module.exports = Project;