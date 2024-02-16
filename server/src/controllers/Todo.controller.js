// Importing required modules and constants
import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helpers.js";
import { statuscode } from "../utils/constant.js";
import User from "../models/User.js"; // Importing the User model
import Todo from "../models/Todo.js"; // Importing the Todo model

// Controller function for creating a new todo
export const createTodo = async (req, res) => {
    // Validate request body
    const error = validationResult(req);
    
    // If there are validation errors
    if (!error.isEmpty()) {
        // Return a validation error response
        return res.json(jsonGenerate(
            statuscode.VALIDATION_ERROR,
            "todo is required",
            error.mapped()
        ));
    }

    // Check if user ID is available
    if (!req.userId) {
        return res.json(jsonGenerate(statuscode.UNPROCESSABLE_ENTITY, "User ID is required"));
    }

    // Creating a new todo in the database
    try {
        const result = await Todo.create({
            userId: req.userId, // User ID stored in the request object by the authentication middleware
            desc: req.body.desc, // Description of the todo from the request body
        });

        // If todo creation is successful
        if (result) {
            // Update user's todos array with the newly created todo
            const user = await User.findOneAndUpdate(
                { _id: req.userId },
                { $push: { todos: result } }
            );

            // Return a success response with the created todo
            return res.json(jsonGenerate(
                statuscode.SUCCESS,
                "Todo created successfully",
                result
            ));
        }
    } catch (error) {
        // If an error occurs during todo creation, return an error response
        return res.json(jsonGenerate(
            statuscode.UNPROCESSABLE_ENTITY,
            "Something went wrong",
            error
        ));
    }
};
