import jwt from "jsonwebtoken";
import ENV from "../config.js";
import UserModel from "../models/user_model.js";

export default async function Auth(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = await jwt.verify(token, ENV.JWT_SECRET);
        const userId = decoded.userID;
        const user = await UserModel.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: "Auth failed" })
    }
}

export function local_variables(req, res, next) {
    req.app.locals = {
        OTP: null,
        resetSession: false
    }
    next();
}