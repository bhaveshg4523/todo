import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helpers.js";
import { statuscode } from "../utils/constant.js";
import User from "../models/User.js";
import Todo from "../models/Todo.js";
export const createTodo=async (req,res)=>{
    const error = validationResult(req);
    if (!error.isEmpty()){
        return res.json(
            jsonGenerate(statuscode.VALIDATION_ERROR,
                "todo is required",
                error.mapped())
        );
    }
    console.log('Executing createTodo');
    //console.log(req);
    try {
        if (!req.userId) {
            return res.json(jsonGenerate(statuscode.UNPROCESSABLE_ENTITY, "User ID is required"));
        }
        const result = await Todo.create({
            userId :req.userId,
            desc: req.body.desc,
        });
        if (result){
            const user = await User.findOneAndUpdate({
                _id:req.userId},{ $push:{todos:result} });
            return res.json(jsonGenerate(statuscode.SUCCESS,
                "todo created successfully",result));
        }
    } catch (error) {
        return res.json(jsonGenerate(statuscode.UNPROCESSABLE_ENTITY,
            "Something Went wrong",error));
    }
};
