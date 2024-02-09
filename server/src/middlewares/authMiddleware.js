import { JWT_TOKEN_SERCET, statuscode } from "../utils/constant.js"
import { jsonGenerate } from "../utils/helpers.js"
import Jwt from 'jsonwebtoken';
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */

const authMiddleware = (req,res,next)=>{
    console.log('Executing authMiddleware');
    if (req.headers["auth"]=== undefined){
        return res.json(jsonGenerate
            (statuscode.AUTH_ERROR,
            "access denied"));
    }
    const token = req.headers['auth'];
    try {
        const decoded = Jwt.verify(token,JWT_TOKEN_SERCET);
        console.log(decoded);
        req.userId = decoded.UserId;
        return next();

    } catch (error) {
        return res.json (jsonGenerate(
            statuscode.UNPROCESSABLE_ENTITY,"Invalid Token"
        ));
    }
};
export default authMiddleware;