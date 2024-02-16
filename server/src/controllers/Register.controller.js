// Importing required modules and constants
import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helpers.js";
import { statuscode, JWT_TOKEN_SERCET } from "../utils/constant.js";
import bcrypt from 'bcrypt'; // Importing bcrypt for password hashing
import User from "../models/User.js"; // Importing the User model
import Jwt from 'jsonwebtoken'; // Importing jsonwebtoken for JWT token creation

// Controller function for user registration
const Register = async (req, res) => {
    // Checking for validation errors using express-validator
    const error = validationResult(req);
    
    // If there are no validation errors
    if (error.isEmpty()) {
        // Extracting user data from the request body
        const { name, username, password, email } = req.body;
        
        // Generating a salt and hashing the password using bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);

        // Checking if a user with the provided email or username already exists
        const userExist = await User.findOne({ $or: [{ email: email }, { username: username }] });

        // If a user with the provided email or username already exists
        if (userExist) {
            // Return an error response
            return res.json(jsonGenerate(statuscode.UNPROCESSABLE_ENTITY, "User or email already exists"));
        }

        try {
            // Creating a new user in the database
            const result = await User.create({
                name: name,
                email: email,
                password: hashpassword,
                username: username
            });

            // Creating a JWT token for the newly registered user
            const token = Jwt.sign({ userId: result._id }, JWT_TOKEN_SERCET);

            // Return a success response with the user ID and token
            return res.json(jsonGenerate(statuscode.SUCCESS, "Registration successful", { userId: result._id, token: token }));
        } catch (error) {
            // If an error occurs during user creation, log the error
            console.log(error);
        }
    }

    // If there are validation errors, return a validation error response
    return res.json(jsonGenerate(statuscode.VALIDATION_ERROR, "Validation error", error.mapped()));
}

// Exporting the Register controller function
export default Register;
