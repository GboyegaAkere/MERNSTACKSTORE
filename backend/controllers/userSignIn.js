const userModel = require("../models/userModels")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")


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

        //CONDITION TO SHOW IF THE PASSOWRD MATCH OR DOES NOT MATCH THE ONES IN THE DATABASE

        if (checkPassword) {
            const tokenData = {
                _id:user._id,
                email:user.email
            }

            const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET_KEY,{expiresIn: 60 * 60 *8})

            const tokenOption = {
                httpOnly:true,
                secure:true
            }
            
            res.cookie("token",token,tokenOption).json({
                message:"Login Successfully",
                data:token,
                success:true,
                error:false
            })
            
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