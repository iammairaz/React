const express = require("express")
const authController = require("../controllers/authController");
const authenticateToken = require("../middlewares/authMiddleware");
const { userSignupMiddleware, userLoginMiddleware } = require("../middlewares/userMiddleware");

const router = express.Router();

router.post('/signup', userSignupMiddleware,authController.signUp);
router.post('/login',userLoginMiddleware,authController.login);
router.put('/updateUserDetails/:mobileNo',authenticateToken,authController.updateUserDetails);
router.get('/getUsers',authenticateToken,authController.getUsers)

module.exports = router;