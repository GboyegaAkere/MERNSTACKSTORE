const userModel = require("../models/userModels")
const bcrypt = require('bcryptjs');

async function userSignInController(req,res) {
    try {
        const {email, password} = req.body
        if (!email) {
            throw new Error ("please provide email")
        }

        if (!password) {
            throw new Error ("enter your password")
        }

        // CHECKING IF THE USER IS AVAILABLE IN THE DATABASE
        const user = await userModel.findOne({email})

        if (!user) {
            throw new Error("user is not found")
        }

        // TO COMPARE THE PASSWORD INSIDE THE DATABASE
        const checkPassword = await bcrypt.compare(password,user.password)
        
        console.log("checkPassword", checkPassword)

        //CONDITION TO SHOW IF THE PASSOWRD MATCH OR DOES NOT MATCH ITH THE ONES IN THE DATABASE

        if (checkPassword) {
            
        } else {
            throw new Error("please check your password")
        }

    } catch (err) {
        res.json({
            message:err.message || err,
            error:true,
            success:false
        })
    }
}

module.exports = userSignInController