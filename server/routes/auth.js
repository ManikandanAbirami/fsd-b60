const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token - jwtData = payload data
    const jwtData = { _id: user._id, name: user.name };
    const token = jwt.sign(jwtData, process.env.JWTSECRET, { expiresIn: "2h" });
    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
