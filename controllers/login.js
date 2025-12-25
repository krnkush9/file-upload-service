// packages
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// login controller
exports.loginController = async (req, res) => {
    try {
        // validation
        if (!req.body.email || !req.body.password) {
            if (!req.body.email) return res.status(200).json({ success: false, message: "Email required" })
            if (!req.body.password) return res.status(200).json({ success: false, message: "Password required" })
        }
        // get value
        const { email, password } = req.body;
        // check user exist or not
        const user = await userModel.findOne({email: email});
        // if user does not exist
        if (!user) {
            return res.status(200).json({
                success: false,
                message: "User does not exist. Please create an account"
            })
        }

        // if user exist
        // match password
        let token;
        if (await bcrypt.compare(password, user.password)) {
            // password correct then generate token
            user.password = undefined;
            // create payload
            const payload = {
                id: user._id,
                email: user.email,
            }
            // generate token
            token = jwt.sign(
                payload,
                process.env.JWT_SECRET_KEY,
                { expiresIn: "2h" }
            )
        } else {
            // password incorrect
            return res.status(200).json({
                success: false,
                message: "Incorrect password"
            })
        }
        // send response
        res.status(200).json({
            success: true,
            message: "Login successfully",
            user: user,
            token: token
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Login failed. Please try again.",
            err: err.message
        })
    }
}