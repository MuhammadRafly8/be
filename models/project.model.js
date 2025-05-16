const { DataTypes } = require('sequelize');
const db = require('../database/sequelize');
const User = require('./user.model');

const Project = db.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  job_scope: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  contact_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  contact_email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  contact_phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  tech_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  tech_email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  tech_phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  admin_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  admin_email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  admin_phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'Proposal'
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  progress: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  admin_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  technician_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  tableName: 'projects',
  timestamps: true,
  underscored: true
});

// Fix the associations with unique aliases
Project.belongsTo(User, { foreignKey: 'admin_id', as: 'adminUser' });
Project.belongsTo(User, { foreignKey: 'technician_id', as: 'technicianUser' });

module.exports = Project;