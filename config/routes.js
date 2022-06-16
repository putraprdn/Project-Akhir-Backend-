const express = require("express");
const controllers = require("../app/controllers");

const appRouter = express.Router();
const apiRouter = express.Router();

/**
 * TODO: Implement your own API
 *       implementations
 */

appRouter.post("/user/register", controllers.api.v1.userController.register);
appRouter.post("/user/login", controllers.api.v1.userController.login);
appRouter.put("/user/update/:id", controllers.api.v1.userController.update);
appRouter.delete("/user/destroy/:id", controllers.api.v1.userController.destroy);

module.exports = appRouter;
