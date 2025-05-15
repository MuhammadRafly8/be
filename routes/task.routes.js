const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const { authenticateToken } = require('../middleware/auth');

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Check if the controller functions exist before using them
// Get all tasks
if (taskController.getAllTasks) {
  router.get('/', taskController.getAllTasks);
} else {
  // Provide a temporary implementation if the function doesn't exist
  router.get('/', (req, res) => {
    res.status(200).json({ message: 'Task list endpoint (to be implemented)', tasks: [] });
  });
}

// Add route to get tasks by project ID
if (taskController.getTasksByProjectId) {
  router.get('/project/:projectId', taskController.getTasksByProjectId);
} else {
  router.get('/project/:projectId', (req, res) => {
    res.status(200).json({ message: `Tasks for project ${req.params.projectId} (to be implemented)`, tasks: [] });
  });
}

// Get task by ID
if (taskController.getTaskById) {
  router.get('/:id', taskController.getTaskById);
} else {
  router.get('/:id', (req, res) => {
    res.status(200).json({ message: 'Task detail endpoint (to be implemented)', task: null });
  });
}

// Create new task
if (taskController.createTask) {
  router.post('/', taskController.createTask);
} else {
  router.post('/', (req, res) => {
    res.status(201).json({ message: 'Task creation endpoint (to be implemented)' });
  });
}

// Update task
if (taskController.updateTask) {
  router.put('/:id', taskController.updateTask);
} else {
  router.put('/:id', (req, res) => {
    res.status(200).json({ message: 'Task update endpoint (to be implemented)' });
  });
}

// Delete task
if (taskController.deleteTask) {
  router.delete('/:id', taskController.deleteTask);
} else {
  router.delete('/:id', (req, res) => {
    res.status(200).json({ message: 'Task deletion endpoint (to be implemented)' });
  });
}

module.exports = router;