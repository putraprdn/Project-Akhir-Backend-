const model = require('../../models');

module.exports = {
    // Show all products
    list: async (req, res) => {
        try {
            const products = await model.product.findAll();

            return res.status(200).json({
                "success": true,
                "error": 0,
                "message": "Products listed",
                "data": products
            });
        } catch (error) {
            res.status(500).json({
                "success": false,
                "error": error.code,
                "message": error,
                "data": null
            });
        }
    },
    // Show a product by id
    findById: async (req, res) => {
        try {
            const product = await model.product.findByPk(req.params.id);
            return res.status(200).json({
                "success": true,
                "error": 0,
                "message": "Product found",
                "data": product
            });
        } catch (error) {
            res.status(500).json({
                "success": false,
                "error": error.code,
                "message": error,
                "data": null
            });
        }
    },
    // Show a product by name
    findByName: async (req, res) => {
        try {
            const product = await model.product.findOne({
                where: {
                    name: req.params.name
                }
            });
            res.status(200).json({
                "success": true,
                "error": 0,
                "message": "Product found",
                "data": product
            });
        } catch (error) {
            res.status(500).json({
                "success": false,
                "error": error.code,
                "message": error,
                "data": null
            });
        }
    },
    // Show a product by category
    findByCategory: async (req, res) => {
        try {
            const product = await model.product.findAll({
                where: {
                    categoryId: req.params
                }
            });
            res.status(200).json({
                "success": true,
                "error": 0,
                "message": "Product found",
                "data": product
            });
        } catch (error) {
            res.status(500).json({
                "success": false,
                "error": error.code,
                "message": error,
                "data": null
            });
        }
    },
    // Create a new product
    create: async (req, res) => {
        try {
            const product = await model.product.create(req.body);
            res.status(200).json({
                "success": true,
                "error": 0,
                "message": "Product created",
                "data": product
            });
        } catch (error) {
            res.status(500).json({
                "success": false,
                "error": error.code,
                "message": error,
                "data": null
            });
        }
    },
    // Update a product
    update: async (req, res) => {
        try {
            const product = await model.product.update(req.body, {
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json({
                "success": true,
                "error": 0,
                "message": "Product updated",
                "data": product
            });
        } catch (error) {
            res.status(500).json({
                "success": false,
                "error": error.code,
                "message": error,
                "data": null
            });
        }
    },
    // Delete a product
    destroy: async (req, res) => {
        try {
            const product = await model.product.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json({
                "success": true,
                "error": 0,
                "message": "Product deleted",
                "data": product
            });
        } catch (error) {
            res.status(500).json({
                "success": false,
                "error": error.code,
                "message": error,
                "data": null
            });
        }
    }
}