const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db/connectDB");

const app = express();
const port = process.env.PORT || 5000;

// import routes
const userRoutes = require("./routes/user");

app.use(express.json());
app.use(cors());

// Defining routes
app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
