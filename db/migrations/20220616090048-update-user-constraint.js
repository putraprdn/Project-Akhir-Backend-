"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		return [
			queryInterface.changeColumn("users", "city", {
				type: Sequelize.STRING,
				allowNull: true,
			}),
			queryInterface.changeColumn("users", "address", {
				type: Sequelize.STRING,
				allowNull: true,
			}),
			queryInterface.changeColumn("users", "phoneNumber", {
				type: Sequelize.STRING,
				allowNull: true,
			}),
			queryInterface.changeColumn("users", "image", {
				type: Sequelize.STRING,
				allowNull: true,
			}),
		];
	},

	async down(queryInterface, Sequelize) {
		return [
			queryInterface.removeColumn("users", "city"),
			queryInterface.removeColumn("users", "address"),
			queryInterface.removeColumn("users", "phoneNumber"),
			queryInterface.removeColumn("users", "image"),
		];
	},
};
