// Importing constants and helper functions from the constant.js and helpers.js files
import { JWT_TOKEN_SERCET, statuscode } from "../utils/constant.js"
import { jsonGenerate } from "../utils/helpers.js"

// Importing the jsonwebtoken library for handling JSON Web Tokens (JWT)
import Jwt from 'jsonwebtoken';

/**
 * Middleware function for authentication
 * @param {*} req - The request object
 * @param {*} res - The response object
 * @param {*} next - The next middleware function in the chain
 * @returns - Returns the next middleware function or an error response
 */
const authMiddleware = (req, res, next) => {
    console.log('Executing authMiddleware');

    // Checking if the 'auth' header is present in the request
    if (req.headers["auth"] === undefined) {
        // If 'auth' header is not present, return an error response
        return res.json(jsonGenerate(
            statuscode.AUTH_ERROR,
            "access denied"
        ));
    }

    // Extracting the token from the 'auth' header
    const token = req.headers['auth'];

    try {
        // Verifying the token using the JWT_SECRET
        const decoded = Jwt.verify(token, JWT_TOKEN_SERCET);
        console.log(decoded);

        // Storing the decoded user ID in the request object for further processing
        req.userId = decoded.UserId;

        // Calling the next middleware function in the chain
        return next();
    } catch (error) {
        // If an error occurs during token verification, return an error response
        return res.json(jsonGenerate(
            statuscode.UNPROCESSABLE_ENTITY,
            "Invalid Token"
        ));
    }
};

// Exporting the authMiddleware function for use in other modules
export default authMiddleware;
