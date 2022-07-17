const express = require("express");
const cors = require("cors");
const controllers = require("../app/controllers");
const middlewares = require("../app/middleware");
const validators = require("../app/validators");
const passport = require("passport");
const multer = require("multer");
const path = require("path");

// Configuration for multer
const multerStorage = (myPath) =>
	multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, `public/files/${myPath}`); // location for assets
		},
		filename: (req, file, cb) => {
			const ext = file.mimetype.split("/")[1];
			cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
		},
	});
const multerFilter = (req, file, callback) => {
	const ext = path.extname(file.originalname);
	if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
		return callback(new Error("Only images are allowed"));
	}
	callback(null, true);
};
const upload = (uploadFor) =>
	multer({
		storage: multerStorage(uploadFor),
		fileFilter: multerFilter,
	});
const imagePath = {
	user: "user", // user path
	product: "product", // product path
};

// Some dependencies for api documenations
const YAML = require("yamljs");
const swaggerUI = require("swagger-ui-express");
const apiDocs = YAML.load("./api-doc.yaml");

// const appRouter = express.Router();
const apiRouter = express.Router();

// user cors
apiRouter.use(cors());

// Configuration for Facebook Auth
require("../app/middleware/facebookAuth");

// Configuration for Google Auth
require("../app/middleware/googleAuth");

apiRouter.use(passport.initialize());
passport.serializeUser((user, callback) => {
	callback(null, user);
});
passport.deserializeUser((user, callback) => {
	callback(null, user);
});

/** Root handler */
apiRouter.get("/", controllers.api.v1.applicationController.handleGetRoot);

/** API DOCUMENTATION using Swagger UI */
apiRouter.use("/api/documentation", swaggerUI.serve, swaggerUI.setup(apiDocs));

/** CATEGORY API*/
apiRouter.get("/api/category/list", controllers.api.v1.categoryController.list);
apiRouter.get(
	"/api/category/:id",
	controllers.api.v1.categoryController.findById
);
apiRouter.post(
	"/api/category/create",
	validators.validate(validators.categoryValidator.createRules),
	controllers.api.v1.categoryController.create
);
apiRouter.put(
	"/api/category/update/:id",
	validators.validate(validators.categoryValidator.updateRules),
	controllers.api.v1.categoryController.update
);
apiRouter.delete(
	"/api/category/delete/:id",
	controllers.api.v1.categoryController.destroy
);

/** PRODUCT API */
// Product List
apiRouter.get("/api/product/list", controllers.api.v1.productController.list);
// Show a product by id
apiRouter.get(
	"/api/product/:id",
	controllers.api.v1.productController.findById
);
// Show a product by name
apiRouter.get(
	"/api/product/name/:name",
	controllers.api.v1.productController.findByName
);
// Show a product by category
apiRouter.get(
	"/api/product/by-category/:categoryId",
	controllers.api.v1.productController.findByCategory
);
// Create a new product
apiRouter.post(
	"/api/product/create",
	middlewares.checkToken,
	upload(imagePath.product).array("image", 4),
	validators.validate(validators.productValidator.createRules),
	controllers.api.v1.productController.create
);
// Update a product
apiRouter.put(
	"/api/product/update/:id",
	middlewares.checkToken,
	upload(imagePath.product).array("image", 4),
	validators.validate(validators.productValidator.updateRules),
	controllers.api.v1.productController.update
);
// Delete a product
apiRouter.delete(
	"/api/product/delete/:id",
	middlewares.checkToken,
	controllers.api.v1.productController.destroy
);

/** USER API */
// Register user
apiRouter.post(
	"/api/user/register",
	validators.validate(validators.userValidator.registerRules),
	controllers.api.v1.userController.register
);
// Login user
apiRouter.post(
	"/api/user/login",
	validators.validate(validators.userValidator.loginRules),
	controllers.api.v1.userController.login
);
apiRouter.get(
	"/api/user/whoami/:token",
	middlewares.checkToken,
	controllers.api.v1.userController.whoami
);
// Update user
apiRouter.put(
	"/api/user/update/:token",
	middlewares.checkToken,
	upload(imagePath.user).single("image"),
	validators.validate(validators.userValidator.updateRules),
	controllers.api.v1.userController.update
);
// Login using google auth
apiRouter.get(
	"/user/auth/google",
	passport.authenticate("google", {
		scope: ["profile", "email"],
	})
);
apiRouter.get(
	"/user/auth/google/redirect",
	passport.authenticate("google", {
		failureRedirect: "/login",
		session: false,
	}),
	(req, res) => {
		const jwt = req.user.token;
		const data = {
			id: req.user.id,
			name: req.user.name,
			email: req.user.email,
			city: req.user.city,
			address: req.user.address,
			phoneNumber: req.user.phoneNumber,
			image: req.user.image,
			createdAt: req.user.createdAt,
			updatedAt: req.user.updatedAt,
		};
		req.session = { jwt };
		res.locals.user = { jwt };
		return res.status(200).json({
			success: true,
			error: 0,
			message: "Login successful",
			data: data,
			token: jwt,
		});
	}
);
// Login using facebook auth
apiRouter.get(
	"/user/auth/facebook",
	passport.authenticate("facebook", {
		scope: ["public_profile", "email"],
	})
);
apiRouter.get(
	"/user/auth/facebook/redirect",
	passport.authenticate("facebook", {
		failureRedirect: "/login",
		session: false,
	}),
	(req, res) => {
		const jwt = req.user.token;
		const data = {
			id: req.user.id,
			name: req.user.name,
			email: req.user.email,
			city: req.user.city,
			address: req.user.address,
			phoneNumber: req.user.phoneNumber,
			image: req.user.image,
			createdAt: req.user.createdAt,
			updatedAt: req.user.updatedAt,
		};
		req.session = { jwt };
		res.locals.user = { jwt };
		return res.status(200).json({
			success: true,
			error: 0,
			message: "Login successful",
			data: data,
			token: jwt,
		});
	}
);
// Delete user
apiRouter.delete(
	"/api/user/delete/:token",
	middlewares.checkToken,
	controllers.api.v1.userController.destroy
);

/**
 * OFFER API
 */
//Get all offers
apiRouter.get("/api/offer/list", controllers.api.v1.offerController.list);
//Create an offers
apiRouter.post(
	"/api/offer/create/:id",
	middlewares.checkToken,
	validators.validate(validators.offerValidator.createRules),
	controllers.api.v1.offerController.create
);
//Update an offers
apiRouter.put(
	"/api/offer/update/:id",
	validators.validate(validators.offerValidator.updateRules),
	controllers.api.v1.offerController.update
);
//Get an offers
apiRouter.get("/api/offer/:id", controllers.api.v1.offerController.findById);
//Get all offers by user token
apiRouter.get(
	"/api/offer/user/:token",
	middlewares.checkToken,
	controllers.api.v1.offerController.findByUser
);
//Get all offers by product id
apiRouter.get(
	"/api/offer/product/:productId",
	controllers.api.v1.offerController.findByProduct
);

/**
 * Error handler
 */
apiRouter.use(controllers.api.v1.applicationController.handleNotFound);

module.exports = apiRouter;
