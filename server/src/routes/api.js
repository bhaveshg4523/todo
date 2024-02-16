// Importing the Express framework
import Express from "express";

// Importing controller functions for user registration and login
import Register from "../controllers/Register.controller.js";
import Login from "../controllers/Login.controller.js";

// Importing controller functions for todo management
import { createTodo } from "../controllers/Todo.controller.js";
import { GetTodos } from "../controllers/TodoList.controller.js";
import { MarkTodo } from "../controllers/MarkTodo.contoller.js";
import { RemoveTodo } from "../controllers/RemoveTodo.controller.js";

// Importing validation schemas for user registration and login
import { RegisterSchema } from "../validationSchema/RegisterSchema.js";
import { LoginSchema } from "../validationSchema/LoginSchema.js";

// Importing express-validator for input validation
import { check } from "express-validator";

// Creating an Express Router instance for API routes
const apiRoute = Express.Router();

// Creating a separate Express Router instance for protected API routes
export const apiProtected = Express.Router();

// Route for user registration with validation middleware
apiRoute.post('/register', RegisterSchema, Register);

// Route for user login with validation middleware
apiRoute.post('/login', LoginSchema, Login);

// Route for creating a new todo with input validation middleware
apiProtected.post('/createTodo', [check('desc', "todo desc is required").exists()], createTodo);

// Route for retrieving all todos
apiProtected.get('/todolist', GetTodos);

// Route for marking a todo as completed with input validation middleware
apiProtected.post('/marktodo', [check('Todo_id', "todo id desc is required").exists()], MarkTodo);

// Route for deleting a todo with input validation middleware
apiProtected.post('/deleteTodo', [check('Todo_id', "todo id desc is required").exists()], RemoveTodo);

// Exporting the API route for use in other modules
export default apiRoute;
