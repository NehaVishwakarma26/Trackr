const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Create a new task
router.post('/tasks', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate('project_id')
      .populate('assigned_to');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific task by ID
router.get('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('project_id')
      .populate('assigned_to');
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get all tasks assigned to a candidate
router.get('/tasks/candidate/:id', async (req, res) => {
  try {
    const tasks = await Task.find({ assigned_to: req.params.id })
      .populate('project_id')
      .populate('assigned_to');
    if (!tasks.length) return res.status(404).json({ message: 'No tasks found for this candidate' });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/tasks/projects/:project_id', async (req, res) => {
  try {
    // Fetch tasks based on the project ID
    const tasks_projects = await Task.find({ project_id: req.params.project_id });

    // Check if no tasks are found
    if (!tasks_projects.length) {
      return res.status(404).json({
        success: false,
        message: 'No tasks found for this project',
      });
    }

    // Return the tasks
    res.status(200).json({
      success: true,
      data: tasks_projects,
    });
  } catch (error) {
    // Handle server errors
    console.error('Error fetching tasks:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Update a task
router.put('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a task
router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
