const User = require("../models/user");

// GET all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST create new user (with password)
exports.createUser = async (req, res) => {
  try {
    const { name, age, password } = req.body;

    // basic validation
    if (!name || !age || !password) {
      return res.status(400).json({
        message: "name, age, password are required ❌"
      });
    }

    const user = new User({
      name,
      age,
      password
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE user by ID (password update also)
exports.updateUser = async (req, res) => {
  try {
    console.log("PUT HIT 👉", req.params.id);

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,          // can update name / age / password
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found ❌" });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
