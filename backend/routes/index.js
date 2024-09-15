const express = require("express")
const router = express.Router()

const userSignUpController = require('../controllers/userSignUp')
const userSignInController = require("../controllers/userSignIn")
const userDetailsController = require("../controllers/userDetails")
const authToken = require("../middleware/authToken")


router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailsController)








module.exports = router