'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PostLikes', {
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      post_id: {
        type: Sequelize.UUID,
        allowNull: false,
      } 
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PostLikes');
  }
};