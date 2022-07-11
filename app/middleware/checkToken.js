const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
	let token = req.headers.authorization;

	if (!token) {
		return res.status(403).json({
			success: false,
			error: 403,
			message: "please provide a token",
			data: null,
		});
	}

	if (token.toLowerCase().startsWith("bearer")) {
		token = token.slice("bearer".length).trim();
	}

	try {
		const jwtPayload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

		if (!jwtPayload) {
			return res.status(403).json({
				success: false,
				error: 403,
				message: "Unauthorized",
				data: null,
			});
		}

		res.locals.user = jwtPayload;

		next();
	} catch (error) {
		return res.status(403).json({
			success: false,
			error: 403,
			message: "failed to check token",
			data: null,
		});
	}
};

module.exports = checkToken;
