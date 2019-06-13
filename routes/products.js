const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');
const codes = require('../restapi/http-codes')

// routes
router.route('/')
    .get(async (req, res) => {
        try {
            const products = await Product.find();
            res.json(products);
        } catch (error) {
            res.status(codes.success).json({ message: error });
        }

        res.status(200);
    })
    .post(async (req, res) => {
        const product = new Product({
            _id: new mongoose.Types.ObjectId,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price
        });

        try {
            const savedProduct = await product.save();
            res.json(savedProduct);
        } catch (error) {
            res.status(codes.servererror).json({ message: error });
        }

        res.status(codes.created);
    });
router.route('/:id')
    .get(async (req, res) => {
        try {
            product = await Product.findById(req.params.id);
            res.json(product);
        } catch (error) {
            res.status(codes.servererror).json({ message: error });
        }

        res.status(codes.success);
    })
    .put(async (req, res) => {
        if (req.body.name !== undefined && req.body.price !== undefined) {
            const product = undefined;
            try {
                product = await Product.findById(req.params.id);
                product.name = req.body.name;
                product.price = req.body.price;
                product.__v = product.__v + 1;

                // optional
                if (req.body.description) {
                    product.description = req.body.description;
                }

                const savedProduct = await product.save();
                res.json(savedProduct);
            } catch (error) {
                res.status(codes.servererror).json({ message: error });
            }

            res.status(codes.success);
        } else {
            res.status(codes.notfound).json({ message: 'Name or Price is missing.' });
        }
    })
    .patch(async (req, res) => {
        if (req.body.name !== undefined && req.body.description !== undefined && req.body.price !== undefined) {
            try {
                const updatedProduct = await Product.updateOne(
                    { _id: req.params.id },
                    {
                        $set: {
                            name: req.body.name,
                            description: req.body.description,
                            price: req.body.price,
                            date: Date.now()
                        }
                    });

                res.json(updatedProduct);
            } catch (error) {
                res.status(codes.servererror).json({ message: error });
            }

            res.status(codes.success);
        } else {
            res.status(codes.notfound).json({ message: 'Name, Description or Price is missing.' });
        }
    })
    .delete(async (req, res) => {
        try {
            const removedProduct = await Product.deleteOne({ _id: req.params.id });
            res.json(removedProduct);
        } catch (error) {
            res.status(codes.servererror).json({ message: error });
        }

        res.status(codes.success);
    });

module.exports = router;