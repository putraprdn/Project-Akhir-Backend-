const express = require("express");
const controllers = require("../app/controllers");

const appRouter = express.Router();
const apiRouter = express.Router();

/** Mount GET / handler */
appRouter.get("/", controllers.main.index);

appRouter.get("/category/list", controllers.api.v1.categoryController.list)
appRouter.get("/category/list/:id", controllers.api.v1.categoryController.findById)
appRouter.post("/category/create", controllers.api.v1.categoryController.create)
appRouter.put("/category/update", controllers.api.v1.categoryController.update)
appRouter.delete("/category/delete/:id", controllers.api.v1.categoryController.destroy)
/** 
 * Implement Product API
 */

// Product List
apiRouter.get("/api/v1/products", controllers.api.v1.product.list);
// Show a product by id
apiRouter.get(
  "/api/v1/products/:id",
  controllers.api.v1.product.setProduct,
  controllers.api.v1.product.show
);
// Show a product by name
apiRouter.get(
  "/api/v1/products/name/:name",
  controllers.api.v1.product.setProduct,
  controllers.api.v1.product.showByName
);
// Show a product by category
apiRouter.get(
  "/api/v1/products/category/:categoryId",
  controllers.api.v1.product.setProduct,
  controllers.api.v1.product.showByCategory
);
// Create a new product
apiRouter.post("/api/v1/products", controllers.api.v1.product.create);
// Update a product
apiRouter.put(
  "/api/v1/products/:id",
  controllers.api.v1.product.setProduct,
  controllers.api.v1.product.update
);
// Delete a product
apiRouter.delete(
  "/api/v1/products/:id",
  controllers.api.v1.product.setProduct,
  controllers.api.v1.product.destroy
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
