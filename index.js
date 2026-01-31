require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authroutes");
const logger = require("./middleware/logger");

const app = express();
app.use(express.json());

// middleware (ALWAYS first)
app.use(logger);

// 🔐 Protected profile route
app.get("/profile", (req, res) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: "Token missing" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res.json({
      message: "Access granted",
      user: decoded
    });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

// MongoDB connect
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.log(err));

// routes
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Server working 🚀");
});

// server start
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});


//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzY5ODM3NDE4LCJleHAiOjE3Njk4NDEwMTh9.y_fwZ9RIxOnXhXCdux8gq9ocr0xOXGec13ysrlpGlK0