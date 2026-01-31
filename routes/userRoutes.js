const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// GET users
router.get("/", userController.getUsers);

// POST user
router.post("/", userController.createUser);

router.put("/:id", userController.updateUser); // ✅ PUT route



module.exports = router;
