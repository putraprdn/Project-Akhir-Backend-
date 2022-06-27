const { body } = require("express-validator");

const createRules = [
	body("price").trim().notEmpty().withMessage("Offer cannot be empty"),
];

const updateRules = [
	body("status").trim().notEmpty().withMessage("Status cannot be empty"),
	// .isIn([0, 1])
	// .withMessage("Status is invalid"),
];

module.exports = { createRules, updateRules };
