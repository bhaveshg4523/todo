// Importing required modules and constants
import { validationResult } from "express-validator";
import { JWT_TOKEN_SERCET, statuscode } from "../utils/constant.js";
import User from "../models/User.js"; // Importing the User model
import bcrypt from 'bcrypt'; // Importing bcrypt for password hashing
import Jwt from 'jsonwebtoken'; // Importing jsonwebtoken for JWT token creation
import { jsonGenerate } from "../utils/helpers.js";

// Controller function for user login
const Login = async (req, res) => {
    // Checking for validation errors using express-validator
    const error = validationResult(req);

    // If there are no validation errors
    if (error.isEmpty()) {
        // Extracting username and password from the request body
        const { username, password } = req.body;

        // Finding the user with the provided username in the database
        const user = await User.findOne({ username: username });

        // If user doesn't exist, return an error response
        if (!user) {
            return res.json(jsonGenerate(
                statuscode.UNPROCESSABLE_ENTITY,
                "Username or password is incorrect"
            ));
        }

        // Verifying the password using bcrypt
        const verified = bcrypt.compareSync(password, user.password);

        // If password is incorrect, return an error response
        if (!verified) {
            return res.json(jsonGenerate(
                statuscode.UNPROCESSABLE_ENTITY,
                "Username or password is incorrect"
            ));
        }

        // If username and password are correct, create a JWT token
        const token = Jwt.sign({ UserId: user._id }, JWT_TOKEN_SERCET);

        // Return a success response with the token and user ID
        return res.json(jsonGenerate(
            statuscode.SUCCESS,
            "Login successful",
            { UserId: user._id, token: token }
        ));
    }

    // If there are validation errors, return a validation error response
    res.json(jsonGenerate(
        statuscode.VALIDATION_ERROR,
        "Validation error",
        error.mapped()
    ));
};

// Exporting the Login controller function
export default Login;
