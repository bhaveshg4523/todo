// Importing required modules and constants
import User from "../models/User.js"; // Importing the User model
import { statuscode } from "../utils/constant.js"; // Importing status codes
import { jsonGenerate } from "../utils/helpers.js"; // Importing helper function for generating JSON responses

// Controller function for getting all todos for a user
export const GetTodos = async (req, res) => {
    try {
        // Finding the user by ID and populating the 'todos' field
        const list = await User.findById(req.userId)
            .select("-password") // Excluding the 'password' field from the response
            .populate('todos') // Populating the 'todos' field with todo documents
            .exec();

        // Returning a success response with the list of todos
        return res.json(jsonGenerate(
            statuscode.SUCCESS,
            "All todo list",
            list
        ));
    } catch (error) {
        // If an error occurs during the process, return an error response
        return res.json(jsonGenerate(
            statuscode.UNPROCESSABLE_ENTITY,
            "Error",
            error
        ));
    }
}
