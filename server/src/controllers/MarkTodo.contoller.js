import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helpers.js";
import { statuscode } from "../utils/constant.js";
import Todo from "../models/Todo.js";
export const MarkTodo = async (req,res)=>{
    const error =validationResult(req);
    if (!error.isEmpty()){
        return res.json(jsonGenerate(
            statuscode.VALIDATION_ERROR,
            "todo id is required",
            error.mapped())
        );
    }
    try {
        const todo = await Todo.findOneAndUpdate({
            _id:req.body.Todo_id,
            userId: req.userId,
        },[{
            $set:{
                isCompleted:{
                    $eq:[false,"$isCompleted"]
                }
            }
        }]);
        if(todo){
            return res.json(jsonGenerate(statuscode.SUCCESS
                ,"updated",todo));
        }
    } catch (error) {
        return res.json(jsonGenerate(statuscode.UNPROCESSABLE_ENTITY
            ,"Error",error));
    }
};