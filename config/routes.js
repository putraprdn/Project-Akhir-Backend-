const express = require("express");
const controllers = require("../app/controllers");
const middlewares = require("../app/middleware");
const validators = require("../app/validators");
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
const userPath = "user"; // user path
const productPath = "product"; // product path
const upload = (uploadFor) =>
	multer({
		storage:
			uploadFor == "user"
				? multerStorage(userPath)
				: multerStorage(productPath),
		fileFilter: multerFilter,
	});

// Some dependencies for api documenations
const YAML = require("yamljs");
const swaggerUI = require("swagger-ui-express");
const apiDocs = YAML.load("./api-doc.yaml");

// const appRouter = express.Router();
const apiRouter = express.Router();

/**
 * API DOCUMENTATION
 * using Swagger UI
 */
apiRouter.use("/api/documentation", swaggerUI.serve, swaggerUI.setup(apiDocs));

/**
 * CATEGORY API
 */
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

/**
 * PRODUCT API
 */

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
	controllers.api.v1.productController.create
);
// Update a product
apiRouter.put(
	"/api/product/update/:id",
	controllers.api.v1.productController.update
);
// Delete a product
apiRouter.delete(
	"/api/product/delete/:id",
	controllers.api.v1.productController.destroy
);

/**
 * USER API
 */
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
// Update user
apiRouter.put(
	"/api/user/update/:token",
	middlewares.checkToken,
	upload(userPath).single("image"),
	validators.validate(validators.userValidator.updateRules),
	controllers.api.v1.userController.update
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

module.exports = apiRouter;
