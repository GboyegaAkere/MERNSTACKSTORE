const userModel = require("../models/userModels")
const bcrypt = require('bcryptjs');


async function userSignUpController(req,res) {
    try {
        const {email,password,name} = req.body
        console.log("req.body",req.body)
        if (!email) {
            throw new Error("please provide email")
        }
        if (!password) {
            throw new Error("please provide password")
        }
        if (!name) {
            throw new Error("please provide username")
        }
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt)

        if (!hashPassword) {
            throw new Error("somethinf is wrong")
        }
        const payLoad ={
            ...req.body,
            password : hashPassword
        }

        const userData = new userModel(payLoad)
        const saveUser = userData.save()

        res.status(200).json({
            data : saveUser,
            success:true,
            error: false,
            message:"User created Successfully!"
        })

    } catch (err) {
        res.json({
            message:err,
            error:true,
            success:false
        })
    }
}

module.exports = userSignUpController