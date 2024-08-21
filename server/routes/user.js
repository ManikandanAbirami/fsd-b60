const express = require("express");
const router = express.Router();

const User = require("../models/User");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

// Register user
router.post("/register", async (req, res) => {
  const { name, password, email } = req.body;

  // Check if user already exists
  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).send("User already exists.");
  }

  // Create new user
  user = new User({
    name,
    password,
    email,
  });

  // Save user to database
  await user.save();

  // Generate JWT token
  const jwtData = { _id: user._id, name: user.name };
  const token = jwt.sign(jwtData, process.env.JWTSECRET, { expiresIn: "2h" });

  res.send(token);
});

// Current User Information
router.get("/", auth, async (req, res) => {
  const profile = await User.findById(req.user._id);
  res.send(profile);
});

module.exports = router;
