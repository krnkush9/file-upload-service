// packages
const bcrypt = require("bcrypt");

// files
const userModel = require("../models/userModel");

// sign up controller
exports.signUpController = async (req, res) => {
    try {
        // get values
        const {
            first_name,
            last_name,
            email,
            mobile_no,
            password
        } = req.body;

        // validation
        if (!first_name || !last_name || !email || !password || !mobile_no) {
            if (!first_name) return res.status(400).json({ success: false, message: "First name required" })

            if (!last_name) return res.status(400).json({ success: false, message: "Last name required" })

            if (!email) return res.status(400).json({ success: false, message: "Email required" })

            if (!password) return res.status(400).json({ success: false, message: "Password required" })

            if (!mobile_no) return res.status(400).json({ success: false, message: "Mobile no. required" })
        }
        // mobile number validation
        if (mobile_no.length !== 10) {
            return res.status(400).json({
                success: false,
                message: "Mobile number must 10 digit",
            })
        }

        // check user already exist
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(200).json({
                success: false,
                message: "User already exist. Please login"
            })
        }

        // password length validation
        if (password.length < 6) {
            return res.status(200).json({
                success: true,
                message: "Password length must be atlest 6.",
            })
        }

        // user does not exist
        // password hashing
        let hashPassword;
        try {
            hashPassword = await bcrypt.hash(password, 10);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error in password hashing",
                err: error.message
            })
        }

        // save data in DB
        const user = await userModel.create({
            first_name,
            last_name,
            email,
            password: hashPassword,
            mobile_no
        })
        // hide password
        user.password = undefined
        // send response
        res.status(200).json({
            success: true,
            message: "User account created successfully",
            user: user
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Can not create account. Please try again.",
            err: err.message
        })
    }
}