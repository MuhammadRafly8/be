const Project = require('../models/project.model');
const User = require('../models/user.model');

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: [
        {
          model: User,
          as: 'adminUser',
          attributes: ['name']
        },
        {
          model: User,
          as: 'technicianUser',
          attributes: ['name']
        }
      ]
    });

    // Format the response
    const formattedProjects = projects.map(project => ({
      id: project.id,
      name: project.name,
      admin: project.adminUser ? project.adminUser.name : 'Not Assigned',
      technician: project.technicianUser ? project.technicianUser.name : 'Not Assigned',
      progress: project.progress || 0,
      state: project.state,
      start_date: project.start_date ? new Date(project.start_date).toISOString().split('T')[0] : '',
      end_date: project.end_date ? new Date(project.end_date).toISOString().split('T')[0] : ''
    }));

    res.status(200).json(formattedProjects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Failed to fetch projects', error: error.message });
  }
};

// Get project by ID
exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Fetching project with ID: ${id}`);
    
    // First check if the project exists
    const project = await Project.findByPk(id);
    
    if (!project) {
      console.log(`Project with ID ${id} not found`);
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Then fetch with associations, but only include fields that exist
    const projectWithDetails = await Project.findByPk(id, {
      include: [
        {
          model: User,
          as: 'adminUser',
          attributes: ['id', 'name', 'email'], // Remove 'phone' from here
          required: false
        },
        {
          model: User,
          as: 'technicianUser',
          attributes: ['id', 'name', 'email'], // Remove 'phone' from here
          required: false
        }
      ]
    });
    
    // Format the response to match the frontend expectations
    const formattedProject = {
      id: projectWithDetails.id,
      name: projectWithDetails.name,
      description: projectWithDetails.description || '',
      job_scope: projectWithDetails.job_scope || '',
      contact_name: projectWithDetails.contact_name || '',
      contact_email: projectWithDetails.contact_email || '',
      contact_phone: projectWithDetails.contact_phone || '',
      tech_name: projectWithDetails.tech_name || '',
      tech_email: projectWithDetails.tech_email || '',
      tech_phone: projectWithDetails.tech_phone || '',
      admin_name: projectWithDetails.admin_name || '',
      admin_email: projectWithDetails.admin_email || '',
      admin_phone: projectWithDetails.admin_phone || '',
      state: projectWithDetails.state || 'Proposal',
      start_date: projectWithDetails.start_date ? new Date(projectWithDetails.start_date).toISOString().split('T')[0] : '',
      end_date: projectWithDetails.end_date ? new Date(projectWithDetails.end_date).toISOString().split('T')[0] : '',
      progress: projectWithDetails.progress || 0,
      created_at: projectWithDetails.createdAt ? projectWithDetails.createdAt.toISOString() : '',
      updated_at: projectWithDetails.updatedAt ? projectWithDetails.updatedAt.toISOString() : '',
      // Include the associated users if they exist
      adminUser: projectWithDetails.adminUser ? {
        id: projectWithDetails.adminUser.id,
        name: projectWithDetails.adminUser.name,
        email: projectWithDetails.adminUser.email
      } : null,
      technicianUser: projectWithDetails.technicianUser ? {
        id: projectWithDetails.technicianUser.id,
        name: projectWithDetails.technicianUser.name,
        email: projectWithDetails.technicianUser.email
      } : null
    };
    
    console.log('Successfully fetched project details');
    res.status(200).json(formattedProject);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ 
      message: 'Failed to fetch project', 
      error: error.message
    });
  }
};

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const {
      name,
      description,
      job_scope,
      contact_name,
      contact_email,
      contact_phone,
      tech_name,
      tech_email,
      tech_phone,
      admin_name,
      admin_email,
      admin_phone,
      state,
      start_date,
      end_date
    } = req.body;

    // Validate required fields
    if (!name) {
      return res.status(400).json({ message: 'Project name is required' });
    }

    // Create the project with all provided fields
    const project = await Project.create({
      name,
      description: description || '',
      job_scope: job_scope || '',
      contact_name: contact_name || '',
      contact_email: contact_email || '',
      contact_phone: contact_phone || '',
      tech_name: tech_name || '',
      tech_email: tech_email || '',
      tech_phone: tech_phone || '',
      admin_name: admin_name || '',
      admin_email: admin_email || '',
      admin_phone: admin_phone || '',
      state: state || 'Proposal',
      start_date: start_date || null,
      end_date: end_date || null,
      progress: 0 // Default progress
    });

    res.status(201).json({
      message: 'Project created successfully',
      project
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Failed to create project', error: error.message });
  }
};

// Update a project
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      job_scope,
      contact_name,
      contact_email,
      contact_phone,
      admin_id,
      technician_id,
      state,
      start_date,
      end_date,
      progress
    } = req.body;

    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Update project
    await project.update({
      name,
      description,
      job_scope,
      contact_name,
      contact_email,
      contact_phone,
      admin_id,
      technician_id,
      state,
      start_date,
      end_date,
      progress
    });

    res.status(200).json({
      message: 'Project updated successfully',
      project
    });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Failed to update project', error: error.message });
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await project.destroy();
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Failed to delete project', error: error.message });
  }
};

// Update project progress
exports.updateProgress = async (req, res) => {
  try {
    const { id } = req.params;
    const { progress } = req.body;

    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await project.update({ progress });

    res.status(200).json({
      message: 'Project progress updated successfully',
      project
    });
  } catch (error) {
    console.error('Error updating project progress:', error);
    res.status(500).json({ message: 'Failed to update project progress', error: error.message });
  }
};