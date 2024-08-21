const mongoose = require("mongoose");

// connect to DB
mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB connection error:", err));
