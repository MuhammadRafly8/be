const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const { authenticateToken } = require('../middleware/auth');

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Get all projects
router.get('/', projectController.getAllProjects);

// Get project by ID
router.get('/:id', projectController.getProjectById);

// Get tasks for a specific project
router.get('/:projectId/tasks', (req, res) => {
  const { projectId } = req.params;
  // Redirect to the task controller's endpoint
  res.redirect(`/api/tasks/project/${projectId}`);
});

// Create new project
router.post('/', projectController.createProject);

// Update project
router.put('/:id', projectController.updateProject);

// Delete project
router.delete('/:id', projectController.deleteProject);

module.exports = router;