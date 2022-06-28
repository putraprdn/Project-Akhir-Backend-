"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"categories",
			[
				{
					name: "category a",
					description: "desc of category a",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "category b",
					description: "desc of category b",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("categories", null, {});
	},
};
