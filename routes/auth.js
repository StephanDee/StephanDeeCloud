/*
 * @Author: Stephan Dünkel
 * @Date: 2019-07-18 11:08:48
 * @Last Modified by: Stephan Dünkel
 * @Last Modified time: 2019-07-18 13:59:37
 *
 * The routes for authentication.
 */
const router = require("express").Router();
const User = require("../models/user");
const codes = require("../restapi/http-codes");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  // Checking if the user is already in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(codes.wrongrequest).send("E-Mail ist bereits vorhanden.");
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
    res.json({ user: savedUser._id });
  } catch (error) {
    res.status(codes.wrongrequest).json({ message: error });
  }

  res.status(codes.created);
});

router.post("/login", async (req, res) => {
  const errorText = "Die eingebene E-Mail-Adresse oder Passwort ist ungültig.";

  // Check if user exists
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(codes.wrongrequest).json(errorText);
  } else {
    // Check Password
    validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
      res.status(codes.wrongrequest).json(errorText);
    } else {
      // create and assign a token
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
      res.header("auth-token", token).json(token);
    }
  }
});

router.route("/:id").delete(async (req, res) => {
  // TODO: Check auth, email and pw
  try {
    const removedUser = await User.deleteOne({ _id: req.params.id });
    res.json(removedUser);
  } catch (error) {
    res.status(codes.wrongrequest).json({ message: error });
  }

  res.status(codes.success);
});

module.exports = router;
