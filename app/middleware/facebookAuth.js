const jwt = require("jsonwebtoken");
const model = require("../models");
const passport = require("passport");
const { Strategy: FacebookStrategy } = require("passport-facebook");

passport.use(
	new FacebookStrategy(
		{
			clientID: process.env.FACEBOOK_CLIENT_ID,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
			callbackURL: process.env.FACEBOOK_CALLBACK_URL,
			profileFields: ["id", "emails", "name", "photos"],
		},
		async (accessToken, refreshToken, profile, callback) => {
			const account = profile._json;

			let user = {
				name: `${account.first_name} ${account.last_name}`,
				email: account.email,
				image: account.picture.data.url,
				token: undefined,
			};
			// console.log(user);
			try {
				const isEmailExist = await model.user.findOne({
					where: {
						email: user.email,
					},
				});
				// console.log(`isEmailExist: ${JSON.stringify(isEmailExist)}`);
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
					// console.log(`new user: ${JSON.stringify(newUser)}`);
					const createUser = await model.user.create({
						name: newUser.name,
						email: newUser.email,
						image: newUser.image,
					});
					// console.log(createUser);

					const getUser = await model.user.findOne({
						where: {
							email: createUser.email,
						},
					});

					// console.log(`getUser: ${getUser}`);

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
