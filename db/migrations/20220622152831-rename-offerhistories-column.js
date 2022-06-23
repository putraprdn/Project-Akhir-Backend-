"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.renameTable("offerhistories", "offers");
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.dropTable("offerhistories", "offers");
	},
};
