/*
 * @Author: Stephan Dünkel 
 * @Date: 2019-07-18 15:04:12 
 * @Last Modified by: Stephan Dünkel
 * @Last Modified time: 2019-07-18 15:04:38
 * 
 * The user model.
 */
const mongoose = require("mongoose");

const genders = {
  male: "Male",
  female: "Female"
};

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 255
  },
  firstname: {
    type: String,
    required: true,
    max: 255
  },
  lastname: {
    type: String,
    required: true,
    max: 255
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  password: {
    type: String,
    required: true,
    max: 1024
  },
  profileImage: {
    type: String
  },
  age: {
    type: Number,
    max: 3
  },
  gender: {
    type: genders
  },
  nationality: {
    type: String
  },
  phonenumber: {
    type: Number,
    max: 20
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Users", UserSchema);
