const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users.controller");

router.get("/users", usersController.findAllUsers);
router.get("/users/:id", usersController.findUserById);
router.post("/users", usersController.createUser);
router.post("/login", usersController.login);
router.patch("/users/:id/topup", usersController.addUserBalance);

module.exports = router;
