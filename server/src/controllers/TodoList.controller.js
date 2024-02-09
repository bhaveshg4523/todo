import User from "../models/User.js"
import { statuscode } from "../utils/constant.js";
import { jsonGenerate } from "../utils/helpers.js";
export const GetTodos =async(req,res)=>{
    try{
        const list = await User.findById(req.userId)
        .select("-password")
        .populate('todos')
        .exec();
        return res.json(jsonGenerate(statuscode.SUCCESS,
            "All todo list",list))
    }
    catch(error){
        return res.json(jsonGenerate(statuscode.UNPROCESSABLE_ENTITY,
            "Error",error));
    }
}