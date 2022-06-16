const model = require('../../models');

module.exports = {
    // Show all products
    List: async (req, res) => {
        try {
            const products = await model.product.findAll();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // Show a product by id
    findById: async (req, res) => {
        try {
            const product = await model.product.findByPk(req.params.id);
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json(error);
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
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json(error);
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
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // Create a new product
    create: async (req, res) => {
        try {
            const product = await model.product.create(req.body);
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json(error);
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
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json(error);
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
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}