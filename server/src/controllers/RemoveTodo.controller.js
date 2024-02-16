// Importing required modules and constants
import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helpers.js";
import { statuscode } from "../utils/constant.js";
import Todo from "../models/Todo.js"; // Importing the Todo model
import User from "../models/User.js"; // Importing the User model

// Controller function for removing a todo
export const RemoveTodo = async (req, res) => {
    try {
        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(statuscode.VALIDATION_ERROR).json(jsonGenerate(
                statuscode.VALIDATION_ERROR,
                "Validation error",
                errors.array()
            ));
        }

        // Find and delete todo
        const deletedTodo = await Todo.findOneAndDelete({
            userId: req.userId, // User ID stored in the request object by the authentication middleware
            _id: req.body.todo_id, // Todo ID from the request body
        });

        // If todo is not found, return an error response
        if (!deletedTodo) {
            return res.status(statuscode.UNPROCESSABLE_ENTITY).json(jsonGenerate(
                statuscode.UNPROCESSABLE_ENTITY,
                "Todo not found",
                null
            ));
        }

        // Remove todo from user's todos array
        await User.findByIdAndUpdate(req.userId, {
            $pull: { todos: req.body.todo_id } // Pulling the deleted todo ID from the user's todos array
        });

        // Send success response
        return res.json(jsonGenerate(statuscode.SUCCESS, "Todo deleted", null));
    } catch (error) {
        // If an error occurs during the process, log the error and return an error response
        console.error("Error in RemoveTodo:", error);
        return res.status(statuscode.AUTH_ERROR).json(jsonGenerate(
            statuscode.UNPROCESSABLE_ENTITY,
            "Error in deletion",
            null
        ));
    }
};
