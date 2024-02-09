import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helpers.js";
import { statuscode,JWT_TOKEN_SERCET } from "../utils/constant.js";
import bcrypt, { hash } from 'bcrypt';
import User from "../models/User.js";
import Jwt from 'jsonwebtoken';
const Register =async (req,res)=>{

    const error=validationResult(req);
    if (error.isEmpty()){
        const {name,username,password,email}= req.body;
        const salt = await bcrypt.genSalt(10);
        const hashpassword=await bcrypt.hash(password,salt);
        const userExist=await User.findOne({ $or:[{ 
            email:email},{
                username:username
        }]});
        if (userExist){
            return res.json(jsonGenerate(statuscode.UNPROCESSABLE_ENTITY,
                "user or email already exist"))
        }
        try {
            const result=await User.create({
                name:name,
                email:email,
                password:hashpassword,
                username:username
            })

                const token =Jwt.sign({ userId:result._id },JWT_TOKEN_SERCET); 
            return res.json(jsonGenerate(statuscode.SUCCESS,
                "registration successfull",{userId:result._id,token:token}));


        } catch (error) {
            console.log(error);
        }
    }
    return res.json(jsonGenerate(statuscode.VALIDATION_ERROR,"validation error",error.mapped()));

}
export default Register;