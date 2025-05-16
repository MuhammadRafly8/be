const Task = require('../models/task.model');

// Get tasks by project ID
exports.getTasksByProjectId = async (req, res) => {
  try {
    const { projectId } = req.params;
    console.log(`Fetching tasks for project ID: ${projectId}`);
    
    const tasks = await Task.findAll({
      where: { project_id: projectId },
      order: [['due_date', 'ASC']]
    });
    
    console.log(`Found ${tasks.length} tasks for project ID: ${projectId}`);
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching project tasks:', error);
    res.status(500).json({ 
      message: 'Failed to fetch project tasks', 
      error: error.message 
    });
  }
};