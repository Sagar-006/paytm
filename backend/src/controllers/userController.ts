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
        const userId = user._id.toJSON();
        console.log(userId);

        const token = jwt.sign(userId, "ABCDEF123456");

        res.status(200).json({
            message:"signup successfully",
            token:`${token}`
        })
    }
    catch(e){
        console.log(e);
    }
}

export const signin = async(req:Request,res:Response) => {
    const {username,password} = req.body;

    try{
        const user = await User.findOne({
            username,
            password,
        });
        if(!user){
            return res.status(511).json({
                message:"User not found"
            })
        };

        const userId = user._id.toJSON();

        const token = jwt.sign(userId, "ABCDEF123456");

        res.status(200).json({
          message: "Signin successfully",
          token: `${token}`,
        });
    }
    catch(e){
        console.log(e)
    }
}

export const payment = (req:Request,res:Response) => {
    // @ts-ignore
    const id = req.userId;
    console.log(id,"in payment route")
    return res.json({
        message:"this is payment page!"
    })
}

export const userInfoUpdate = async(req:Request,res:Response) => {
    // @ts-ignore
    const _id = req.userId ;
    console.log(_id,"in updateRoute")

    try{

        const user = await User.findById({_id});
        if(!user){
            return res.status(511).json({
                message:"User not found"
            })
        }

        const update = await User.updateOne({_id:_id},{$set: 
            {password:req.body.password,
            firstname:req.body.firstname,
            lastname:req.body.lastname,}

        })
        res.status(200).json({
            message:"user information updated!"
        })
    }
    catch(e){
        return res.status(500).send(e);
    }
} 