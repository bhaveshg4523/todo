import { validationResult } from "express-validator";
import { JWT_TOKEN_SERCET, statuscode } from "../utils/constant.js";
import User from "../models/User.js";
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import { jsonGenerate } from "../utils/helpers.js";
const Login = async (req,res )=> {
    const error = validationResult(req);

    if (error.isEmpty()){
        const { username,password }= req.body;
        const user = await User.findOne({username:username});
        if (!user){
            return res.json(jsonGenerate(statuscode.UNPROCESSABLE_ENTITY,
                "Username or password is incorrect"));
        }
        const verified = bcrypt.compareSync(password,user.password);
        if (!verified){
            return res.json(jsonGenerate(statuscode.UNPROCESSABLE_ENTITY,
                "Username or password is incorrect"))
        }
        const token= Jwt.sign({UserId:user._id},JWT_TOKEN_SERCET);
        return res.json(jsonGenerate(
            statuscode.SUCCESS,"Login successfull",
            {UserId:user._id,token:token}
        ));
    };
    res.json(jsonGenerate(
        statuscode.VALIDATION_ERROR,"validation error",
        error.mapped()
    ));
};
export default Login;
