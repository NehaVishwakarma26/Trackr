const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  candidate_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project', // Reference to the Project model
    required: true
  },
  tasks_completed: {
    type: Number,
    default: 0
  },
  total_tasks: {
    type: Number,
    default: 0
  },
  score: {
    type: Number,
    default: 0 // Calculated score as a percentage
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Progress', ProgressSchema);
