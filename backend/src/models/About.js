const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,  // must have a name
      trim: true       // removes extra spaces
    },
    title: {
      type: String,    // e.g. "Full Stack Developer"
      required: true
    },
    bio: {
      type: String,    // paragraph about yourself
      required: true
    },
    heroTagline: {
      type: String,    // short text on hero e.g. "Building clean digital experiences"
      default: ''
    },
    availability: {
      type: String,    // e.g. "Open to work" or "Currently employed"
      default: 'Open to work'
    },
    location: {
      type: String,    // e.g. "Pune, India"
      default: ''
    },
    profilePhoto: {
      type: String,    // URL to śśyour photo
      default: ''
    },
    resumeUrl: {
      type: String,    // link to your resume PDF
      default: ''
    },
    email: {
      type: String,
      required: true
    },
    githubUrl: {
      type: String,
      default: ''
    },
    leetcodeUrl: {
      type: String,
      default: ''
    },
    linkedinUrl: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true   // adds createdAt and updatedAt automatically
  }
);

const About = mongoose.model('About', aboutSchema);

module.exports = About;