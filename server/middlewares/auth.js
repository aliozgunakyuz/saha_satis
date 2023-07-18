import jwt from "jsonwebtoken";
import ENV from "../config.js";

export default async function Auth(req,res,next){
    try {
        const token = req.headers.authorization.split(" ")[1];

        const tokendecode = await jwt.verify(token, ENV.JWT_SECRET);

        req.user = tokendecode;
        next();
    } catch (error) {
        res.status(401).json({error: "Auth failed"})
    }
}

export function local_variables(req,res,next){
    req.app.locals = {
        OTP : null,
        resetSession: false
    }
    next();
}