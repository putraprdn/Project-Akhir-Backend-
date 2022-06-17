const express = require("express");
const controllers = require("../app/controllers");

const appRouter = express.Router();
const apiRouter = express.Router();

/** Mount GET / handler */
// appRouter.get("/", controllers.main.index);

appRouter.get("/category/list", controllers.api.v1.categoryController.list)
appRouter.get("/category/list/:id", controllers.api.v1.categoryController.findById)
appRouter.post("/category/create", controllers.api.v1.categoryController.create)
appRouter.put("/category/update", controllers.api.v1.categoryController.update)
appRouter.delete("/category/delete/:id", controllers.api.v1.categoryController.destroy)
/** 
 * Implement Product API
 */

// Product List
appRouter.get("/v1/products", controllers.api.v1.productController.list);
// Show a product by id
appRouter.get(
  "/v1/products/:id",
  controllers.api.v1.productController.findById
);
// Show a product by name
appRouter.get(
  "/v1/products/name/:name",
  controllers.api.v1.productController.findByName
);
// Show a product by category
appRouter.get(
  "/v1/products/category/:categoryId",
  controllers.api.v1.productController.findByCategory
);
// Create a new product
appRouter.post("/v1/products", controllers.api.v1.productController.create);
// Update a product
appRouter.put(
  "/v1/products/:id",
  controllers.api.v1.productController.update
);
// Delete a product
appRouter.delete(
  "/v1/products/:id",
  controllers.api.v1.productController.destroy
);

/**
 * TODO: Implement your own API
 *       implementations
 */

appRouter.post("/user/register", controllers.api.v1.userController.register);
appRouter.post("/user/login", controllers.api.v1.userController.login);
appRouter.put("/user/update/:id", controllers.api.v1.userController.update);
appRouter.delete("/user/destroy/:id", controllers.api.v1.userController.destroy);

module.exports = appRouter;
