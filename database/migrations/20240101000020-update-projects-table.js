'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // First check if the table exists
    try {
      // Check if columns already exist to avoid errors
      const tableInfo = await queryInterface.describeTable('projects');
      
      // Add tech_name, tech_email, tech_phone if they don't exist
      if (!tableInfo.tech_name) {
        await queryInterface.addColumn('projects', 'tech_name', {
          type: Sequelize.STRING,
          allowNull: true
        });
      }
      
      if (!tableInfo.tech_email) {
        await queryInterface.addColumn('projects', 'tech_email', {
          type: Sequelize.STRING,
          allowNull: true
        });
      }
      
      if (!tableInfo.tech_phone) {
        await queryInterface.addColumn('projects', 'tech_phone', {
          type: Sequelize.STRING,
          allowNull: true
        });
      }
      
      // Add admin_name, admin_email, admin_phone if they don't exist
      if (!tableInfo.admin_name) {
        await queryInterface.addColumn('projects', 'admin_name', {
          type: Sequelize.STRING,
          allowNull: true
        });
      }
      
      if (!tableInfo.admin_email) {
        await queryInterface.addColumn('projects', 'admin_email', {
          type: Sequelize.STRING,
          allowNull: true
        });
      }
      
      if (!tableInfo.admin_phone) {
        await queryInterface.addColumn('projects', 'admin_phone', {
          type: Sequelize.STRING,
          allowNull: true
        });
      }
      
    } catch (error) {
      console.log('Migration error:', error.message);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      // Remove the columns in reverse order
      await queryInterface.removeColumn('projects', 'admin_phone');
      await queryInterface.removeColumn('projects', 'admin_email');
      await queryInterface.removeColumn('projects', 'admin_name');
      await queryInterface.removeColumn('projects', 'tech_phone');
      await queryInterface.removeColumn('projects', 'tech_email');
      await queryInterface.removeColumn('projects', 'tech_name');
    } catch (error) {
      console.log('Migration rollback error:', error.message);
    }
  }
};