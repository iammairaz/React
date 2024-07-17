const express = require("express");
const authenticateToken = require("../middlewares/authMiddleware");
const accountController = require("../controllers/accountController");

const router = express.Router();

router.get("/getBalance/:userId",authenticateToken,accountController.getBalance);
router.post("/transferMoney",authenticateToken,accountController.transferMoney);

module.exports = router;