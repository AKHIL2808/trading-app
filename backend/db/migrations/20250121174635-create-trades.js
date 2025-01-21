'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('trades', {
      coinPair: {
        primaryKey: true,
        type: Sequelize.STRING
      },
      time: {
        primaryKey: true,
        type: Sequelize.DATE
      },
      price: {
        type: Sequelize.DECIMAL
      },
      quantity: {
        type: Sequelize.DECIMAL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('trades');
  }
};
