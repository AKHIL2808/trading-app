'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query("SELECT create_hypertable('trades', by_range('time'));");
  },

  down: (queryInterface, Sequelize) => {
  }
};
