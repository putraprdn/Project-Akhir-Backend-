"use strict";
const { Op } = require("sequelize");
const model = require("../../app/models");

module.exports = {
	async up(queryInterface, Sequelize) {
		const offerPrices = [];
		const productPrices = [];
		const productIds = [];
		const status = "pending";

		const products = await model.product.findAll();

		products.forEach((product) => {
			productPrices.push(product.price);
			productIds.push(product.id);
			offerPrices.push(product.price - 5000);
		});

		const user = await model.user.findOne({ where: { name: "demo" } });

		const offers = offerPrices.map((offerPrice, idx) => ({
			productId: productIds[idx],
			createdBy: user.id,
			price: offerPrice,
			status: status.toUpperCase(),
			createdAt: new Date(),
			updatedAt: new Date(),
		}));

		await queryInterface.bulkInsert("offers", offers, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("offers", null, {});
	},
};
