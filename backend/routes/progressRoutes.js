const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');

// Create a progress record
router.post('/progress', async (req, res) => {
  try {
    const progress = new Progress(req.body);
    await progress.save();
    res.status(201).json(progress);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get progress for all candidates
router.get('/progress', async (req, res) => {
  try {
    const progress = await Progress.find()
      .populate('candidate_id')
      .populate('project_id');
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update progress
router.put('/progress/:id', async (req, res) => {
  try {
    const progress = await Progress.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!progress) return res.status(404).json({ message: 'Progress not found' });
    res.json(progress);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Get complete progress by project_id (for all candidates)
router.get('/progress/project/:project_id', async (req, res) => {
    try {
      const progress = await Progress.find({ project_id: req.params.project_id })
        .populate('candidate_id')
        .populate('project_id');
        
      if (progress.length === 0) {
        return res.status(404).json({ message: 'No progress found for this project' });
      }
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
// Get progress by candidate_id
router.get('/progress/candidate/:candidate_id', async (req, res) => {
    try {
      const progress = await Progress.find({ candidate_id: req.params.candidate_id })
        .populate('candidate_id')
        .populate('project_id');
      if (!progress) {
        return res.status(404).json({ message: 'Progress not found for this candidate' });
      }
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
module.exports = router;
