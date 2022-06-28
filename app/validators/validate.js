const { validationResult } = require("express-validator"),
	errorFormatter = ({ msg }) => {
		return `${msg}`;
	};

function validate(validations) {
	return async (req, res, next) => {
		await Promise.all(validations.map((validation) => validation.run(req)));

		const errors = validationResult(req).formatWith(errorFormatter);
		if (errors.isEmpty()) {
			return next();
		}

		const { msg, value, param, location } = errors.errors[0];

		return res.status(400).json({
			success: false,
			error: { value, param, location },
			message: msg,
			data: null,
		});
	};
}

module.exports = validate;
