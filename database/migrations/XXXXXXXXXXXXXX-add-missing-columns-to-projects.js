'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Get table description to check if columns exist
    const tableInfo = await queryInterface.describeTable('projects');
    
    // Add admin_id if it doesn't exist
    if (!tableInfo.admin_id) {
      await queryInterface.addColumn('projects', 'admin_id', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      });
    }
    
    // Add technician_id if it doesn't exist
    if (!tableInfo.technician_id) {
      await queryInterface.addColumn('projects', 'technician_id', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      });
    }
    
    // Add state if it doesn't exist
    if (!tableInfo.state) {
      await queryInterface.addColumn('projects', 'state', {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'Proposal'
      });
    }
    
    // Add progress if it doesn't exist
    if (!tableInfo.progress) {
      await queryInterface.addColumn('projects', 'progress', {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('projects', 'admin_id');
    await queryInterface.removeColumn('projects', 'technician_id');
    await queryInterface.removeColumn('projects', 'state');
    await queryInterface.removeColumn('projects', 'progress');
  }
};