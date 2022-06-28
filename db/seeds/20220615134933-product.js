"use strict";

const model = require("../../app/models");

module.exports = {
	async up(queryInterface, Sequelize) {
		const categoryIds = [];

		const categories = await model.category.findAll();

		categories.forEach((category) => {
			categoryIds.push(category.id);
		});

		const products = categories.map((category, idx) => ({
			name: `product ${idx + 1}`,
			description: `desc of product ${idx + 1}`,
			price: 50000,
			image: "image.png",
			categoryId: categoryIds[idx],
			createdAt: new Date(),
			updatedAt: new Date(),
		}));

		await queryInterface.bulkInsert("products", products, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("products", null, {});
	},
};
