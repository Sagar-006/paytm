import { type Request,type Response,type NextFunction } from "express"
import jwt  from "jsonwebtoken";
export const authMiddleware = (req:Request,res:Response,next:NextFunction) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(403).json({
            message:"User not authenticated!"
        })
    };
    
    try{
        const token = authHeader.split(" ")[1];
        if (!token) return;
    const verifyToken = jwt.verify(token, "ABCDEF123456");
    console.log(verifyToken);
    // @ts-ignore
    req.userId = verifyToken;
    next()
    }catch(e){
        return res.status(500).send(e)
    }

    
} 