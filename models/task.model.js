const { DataTypes } = require('sequelize');
const db = require('../database/sequelize');
const Project = require('./project.model');

const Task = db.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'not_started'
  },
  email_sent: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  project_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'projects',
      key: 'id'
    }
  }
}, {
  tableName: 'tasks',
  timestamps: true,
  underscored: true
});

// Define association
Task.belongsTo(Project, { foreignKey: 'project_id' });
Project.hasMany(Task, { foreignKey: 'project_id' });

module.exports = Task;