// Importing the 'check' function from the 'express-validator' library
import { check } from "express-validator";

// Exporting the validation schema for registration
export const RegisterSchema = [
    // Validation rule for 'name' field
    check('name').trim().isAlpha() // Checking if 'name' contains only alphabetic characters
        .withMessage("name should be alphabet only"), // Error message if validation fails

    // Validation rule for 'username' field
    check('username', 'username is required').exists() // Checking if 'username' exists
        .isAlphanumeric() // Checking if 'username' contains only alphanumeric characters
        .withMessage('username should be alphanumeric character only') // Error message if validation fails
        .trim().isLength({ min: 6, max: 32 }), // Trimming leading and trailing whitespace, and checking length of 'username' between 6 and 32 characters

    // Validation rule for 'password' field
    check('password', 'password is required').exists() // Checking if 'password' exists
        .isLength({ min: 6, max: 100 }) // Checking length of 'password' between 6 and 100 characters
        .trim(), // Trimming leading and trailing whitespace

    // Validation rule for 'email' field
    check('email', 'email is required').exists().isEmail() // Checking if 'email' exists and is in valid email format
];
