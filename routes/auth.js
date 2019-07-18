/*
 * @Author: Stephan Dünkel 
 * @Date: 2019-07-18 11:08:48 
 * @Last Modified by: Stephan Dünkel
 * @Last Modified time: 2019-07-18 11:17:07
 *
 * The routes for authentication.
 */
const router = require("express").Router();
const User = require("../models/user");
const codes = require("../restapi/http-codes");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  // Checking if the user is already in the database
  const emailExist = await User.findOne({email: req.body.email});
  if (emailExist) {
      return res.status(codes.wrongrequest).send('E-Mail ist bereits vorhanden.');
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create new user
  const user = new User({
    name: req.body.name,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: hashedPassword
  });

  try {
    const savedUser = await user.save();
    res.json({user: savedUser._id});
  } catch (error) {
    res.status(codes.wrongrequest).json({ message: error });
  }

  res.status(codes.created);
});

// router.post('/login', (req, res) => {
// });

router.route("/:id")
.delete(async (req, res) => { // TODO: Check auth, email and pw
  try {
    const removedUser = await User.deleteOne({ _id: req.params.id });
    res.json(removedUser);
  } catch (error) {
    res.status(codes.wrongrequest).json({ message: error });
  }

  res.status(codes.success);
});

module.exports = router;
