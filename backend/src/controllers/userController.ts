import {type Request, type Response } from "express"
import User from "../db.js";
import jwt from 'jsonwebtoken'
import zod, { z } from 'zod';

export interface Users {
    username:string,
    password:string,
    firstname:string,
    lastname:string,
}
const signupBody = z.object({
    username:z.string().email(),
    firstname:z.string().max(50),
    lastname:z.string().max(50),
    password:z.string().min(6),

})
export const signup = async (req:Request,res:Response) => {
    console.log(req.body)

    
    try{
        const parseResult = signupBody.safeParse(req.body);
        if(!parseResult.success){
            return res.status(411).json({
                message:"Email already taken / Incorrect inputs"
            })
        }
        const existingUser  = await User.findOne({
            username:req.body.username,
        })

        if(existingUser){
            return res.status(411).json({
                message:"User already exists!"
            })
        }
        const {username,password,firstname,lastname} = parseResult.data as Users;
        const user = await User.create({
            username,
            password,
            firstname,
            lastname,
        })
        const userId = user._id;
        console.log(userId.toJSON());

        const token = jwt.sign(userId.toJSON(), "ABCDEF123456");

        res.json({
            message:"signup successfully",
            token
        })
    }
    catch(e){
        console.log(e);
    }
}