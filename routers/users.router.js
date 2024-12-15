const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users.controller");
const transactionsController = require("../controllers/transactions.controller");
const authenticateToken = require("../middlewares/auth.middleware");

router.get("/users", usersController.findAllUsers);
router.get(
  "/transactions",
  authenticateToken,
  transactionsController.findAllTransactionsByUser
);
router.get("/profile", authenticateToken, usersController.findUserById);

router.post("/auth/register", usersController.createUser);
router.post("/auth/login", usersController.login);
router.patch("/users/:id/topup", usersController.addUserBalance);

module.exports = router;
