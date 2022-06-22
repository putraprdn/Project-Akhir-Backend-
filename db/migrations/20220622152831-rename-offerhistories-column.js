"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.renameTable("offerhistories", "offerHistories");
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.dropTable("offerhistories", "offerHistories");
	},
};
