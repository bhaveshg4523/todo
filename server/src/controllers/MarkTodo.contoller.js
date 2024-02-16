// Importing required modules and constants
import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helpers.js";
import { statuscode } from "../utils/constant.js";
import Todo from "../models/Todo.js"; // Importing the Todo model

// Controller function for marking a todo as completed
export const MarkTodo = async (req, res) => {
    // Checking for validation errors using express-validator
    const error = validationResult(req);
    
    // If there are validation errors
    if (!error.isEmpty()) {
        // Return a validation error response
        return res.json(jsonGenerate(
            statuscode.VALIDATION_ERROR,
            "todo id is required",
            error.mapped()
        ));
    }

    try {
        // Finding the todo by its ID and user ID and updating its 'isCompleted' field to true
        const todo = await Todo.findOneAndUpdate({
            _id: req.body.Todo_id, // Todo ID from the request body
            userId: req.userId, // User ID stored in the request object by the authentication middleware
        }, {
            $set: {
                isCompleted: true // Setting 'isCompleted' field to true
            }
        });

        // If the todo is found and updated successfully
        if (todo) {
            // Return a success response with the updated todo
            return res.json(jsonGenerate(
                statuscode.SUCCESS,
                "updated",
                todo
            ));
        }
    } catch (error) {
        // If an error occurs during the process
        return res.json(jsonGenerate(
            statuscode.UNPROCESSABLE_ENTITY,
            "Error",
            error
        ));
    }
};
