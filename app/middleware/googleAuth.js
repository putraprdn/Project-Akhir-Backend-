const jwt = require("jsonwebtoken");
const model = require("../models");
const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: process.env.GOOGLE_CALLBACK_URL,
		},
		async (accessToken, refreshToken, profile, callback) => {
			const account = profile._json;

			console.log(account);
			let user = {
				name: account.name,
				email: account.email,
				image: account.picture,
				token: undefined,
			};
			console.log(user);
			try {
				const isEmailExist = await model.user.findOne({
					where: {
						email: user.email,
					},
				});
				console.log(`isEmailExist: ${JSON.stringify(isEmailExist)}`);
				if (isEmailExist) {
					const token = jwt.sign(
						{
							id: isEmailExist.id,
							name: isEmailExist.name,
							email: isEmailExist.email,
						},
						process.env.ACCESS_TOKEN_SECRET,
						{ expiresIn: "1d" }
					);

					user = isEmailExist;
					user.token = token;

					return callback(null, user);
				} else {
					const newUser = {
						name: user.name,
						email: user.email,
						image: user.image,
					};
					console.log(`new user: ${JSON.stringify(newUser)}`);
					const createUser = await model.user.create({
						name: newUser.name,
						email: newUser.email,
						image: newUser.image,
					});
					console.log(createUser);

					const getUser = await model.user.findOne({
						where: {
							email: createUser.email,
						},
					});

					console.log(`getUser: ${getUser}`);

					const token = jwt.sign(
						{
							id: getUser.id,
							name: getUser.name,
							email: getUser.email,
						},
						process.env.ACCESS_TOKEN_SECRET,
						{ expiresIn: "1d" }
					);

					user = getUser;
					user.token = token;
					return callback(null, user);
				}
			} catch (error) {
				const throwError = {
					success: false,
					error: error,
					message: error.message,
					data: null,
				};
				return callback(JSON.stringify(throwError));
			}
		}
	)
);
