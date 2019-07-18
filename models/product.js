/*
 * @Author: Stephan Dünkel 
 * @Date: 2019-07-18 15:03:06 
 * @Last Modified by:   Stephan Dünkel 
 * @Last Modified time: 2019-07-18 15:03:06
 * 
 * The product model.
 */
const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Products", ProductSchema);
