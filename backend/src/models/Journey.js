const mongoose = require('mongoose');

const journeySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['education', 'experience', 'certificate'],
      // enum = only these 3 values are allowed, nothing else
      required: true
    },
    title: {
      type: String,    // e.g. "B.Tech CSE" / "React Internship" / "AWS Certificate"
      required: true
    },
    organization: {
      type: String,    // college name / company name / issuing body
      required: true
    },
    description: {
      type: String,    // what you did / learned
      default: ''
    },
    startDate: {
      type: Date,      // when it started
      required: true
    },
    endDate: {
      type: Date,      // when it ended (null if ongoing)
      default: null
    },
    current: {
      type: Boolean,   // true = still ongoing (e.g. current job/college)
      default: false
    },
    certificateUrl: {
      type: String,    // link to certificate (only for type: 'certificate')
      default: ''
    },
    order: {
      type: Number,    // controls display order on timeline
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const Journey = mongoose.model('Journey', journeySchema);

module.exports = Journey;