const { body } = require("express-validator");

const createRules = [
	body("name").trim().notEmpty().withMessage("Name cannot be empty").escape(),
	body("description")
		.trim()
		.notEmpty()
		.withMessage("Description cannot be empty")
		.escape(),
	body("price")
		.trim()
		.notEmpty()
		.withMessage("Price cannot be empty")
		.isInt({ min: 1 })
		.withMessage("Price is invalid"),
	body("categoryId")
		.trim()
		.notEmpty()
		.withMessage("CategoryId cannot be empty")
		.isInt()
		.withMessage("CategoryId is invalid"),
];

const updateRules = [
	body("name").trim().notEmpty().withMessage("Name cannot be empty").escape(),
	body("description")
		.trim()
		.notEmpty()
		.withMessage("Description cannot be empty")
		.escape(),
	body("price")
		.trim()
		.notEmpty()
		.withMessage("Price cannot be empty")
		.isInt({ min: 1 })
		.withMessage("Price is invalid"),
	body("categoryId")
		.trim()
		.notEmpty()
		.withMessage("CategoryId cannot be empty")
		.isInt()
		.withMessage("CategoryId is invalid"),
];

module.exports = { createRules, updateRules };
