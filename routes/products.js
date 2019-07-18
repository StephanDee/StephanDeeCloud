/*
 * @Author: Stephan Dünkel 
 * @Date: 2019-07-18 15:00:53 
 * @Last Modified by: Stephan Dünkel
 * @Last Modified time: 2019-07-18 15:01:20
 * 
 * The routes for products.
 */
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/product");
const codes = require("../restapi/http-codes");
const verify = require("./verifyToken");

// routes
router
  .route("/")
  .get(async (req, res) => {
    // TODO: .get(verify, async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(codes.servererror).json({ message: error });
    }

    res.status(codes.success);
  })
  .post(async (req, res) => {
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      description: req.body.description,
      price: req.body.price
    });

    try {
      const savedProduct = await product.save();
      res.json(savedProduct);
    } catch (error) {
      res.status(codes.wrongrequest).json({ message: error });
    }

    res.status(codes.created);
  });
router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      res.json(product);
    } catch (error) {
      res.status(codes.servererror).json({ message: error });
    }

    res.status(codes.success);
  })
  .put(async (req, res) => {
    if (req.body.name !== undefined && req.body.price !== undefined) {
      try {
        const product = await Product.findById(req.params.id);
        product.date = Date.now();
        product.name = req.body.name;
        product.description = req.body.description;
        product.price = req.body.price;
        product.__v = product.__v + 1;

        const savedProduct = await product.save();
        res.json(savedProduct);
      } catch (error) {
        res.status(codes.servererror).json({ message: error });
      }

      res.status(codes.success);
    } else {
      res.status(codes.notfound).json({ message: "Name or Price is missing." });
    }
  })
  .patch(async (req, res) => {
    if (
      req.body.name !== undefined &&
      req.body.description !== undefined &&
      req.body.price !== undefined
    ) {
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
          }
        );

        res.json(updatedProduct);
      } catch (error) {
        res.status(codes.servererror).json({ message: error });
      }

      res.status(codes.success);
    } else {
      res
        .status(codes.notfound)
        .json({ message: "Name, Description or Price is missing." });
    }
  })
  .delete(async (req, res) => {
    try {
      const removedProduct = await Product.deleteOne({ _id: req.params.id });
      res.json(removedProduct);
    } catch (error) {
      res.status(codes.wrongrequest).json({ message: error });
    }

    res.status(codes.success);
  });

module.exports = router;
