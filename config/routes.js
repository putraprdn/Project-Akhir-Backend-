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

module.exports = appRouter;
