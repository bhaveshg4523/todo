import  Express from "express";
import Register from "../controllers/Register.controller.js";
import Login from "../controllers/Login.controller.js";
import {createTodo} from "../controllers/Todo.controller.js";
import { RegisterSchema } from "../validationSchema/RegisterSchema.js";
import { LoginSchema } from "../validationSchema/LoginSchema.js";
import { check } from "express-validator";
import { GetTodos } from "../controllers/TodoList.controller.js";
import { MarkTodo } from "../controllers/MarkTodo.contoller.js";
import { RemoveTodo } from "../controllers/RemoveTodo.controller.js";


const apiRoute = Express.Router();
export const apiProtected = Express.Router();
apiRoute.post('/register',RegisterSchema,Register);
apiRoute.post('/login',LoginSchema,Login);

apiProtected.post('/createTodo',[check('desc',"todo desc is required").exists()],createTodo);
apiProtected.get(
    '/todolist',
    GetTodos);
apiProtected.post(
        '/marktodo'
        ,[check('Todo_id',"todo id desc is required").exists()],
        MarkTodo);
apiProtected.post(
            '/deleteTodo'
            ,[check('Todo_id',"todo id desc is required").exists()],
            RemoveTodo);
export default apiRoute;