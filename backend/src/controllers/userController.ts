import {  type Request, type Response } from "express";
import { User,UserBalance } from "../db.js";
import jwt from "jsonwebtoken";
import zod, { maxLength, minLength, z } from "zod";
import mongoose from "mongoose";
import { required } from "zod/mini";

export interface Users {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
}
const signupBody = z.object({
  username: z.string().email(),
  firstname: z.string().max(50),
  lastname: z.string().max(50),
  password: z.string().min(6),
});
export const signup = async (req: Request, res: Response) => {
//   console.log(req.body);

  try {
    const parseResult = signupBody.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(411).json({
        message: "Incorrect inputs",
      });
    }
    const existingUser = await User.findOne({
      username: req.body.username,
    });

    if (existingUser) {
      return res.status(411).json({
        message: "User already exists!",
      });
    }
    const { username, password, firstname, lastname } =
      parseResult.data as Users;
    const user = await User.create({
      username,
      password,
      firstname,
      lastname,
    });
    const userId = user._id.toJSON();
    console.log(user);

    const addBalance  = await UserBalance.create({
        userId:user._id,
        balance:1 + Math.random() * 10000,
    })


    const token = jwt.sign(userId, "ABCDEF123456");

    res.status(200).json({
      message: "signup successfully",
      token: `${token}`,
    });
  } catch (e) {
    console.log(e);
  }
};

export const signin = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      username,
      password,
    });
    if (!user) {
      return res.status(511).json({
        message: "User not found",
      });
    }

    const userId = user._id.toJSON();

    const token = jwt.sign(userId, "ABCDEF123456");

    res.status(200).json({
      message: "Signin successfully",
      token: `${token}`,
    });
  } catch (e) {
    console.log(e);
  }
};



export const userInfoUpdate = async (req: Request, res: Response) => {
  // @ts-ignore
  const _id = req.userId;
  console.log(_id, "in updateRoute");

  try {
    const user = await User.findById({ _id });
    if (!user) {
      return res.status(511).json({
        message: "User not found",
      });
    }

    const update = await User.updateOne(
      { _id: _id },
      {
        $set: {
          password: req.body.password,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
        },
      }
    );
    res.status(200).json({
      message: "user information updated!",
    });
  } catch (e) {
    return res.status(500).send(e);
  }
};

export const getAllUsers = async(req:Request,res:Response) => {
    const filter = await req.query.filter || "";

    try{
        const response = await User.find({
            $or:[
                {
                    firstname:{
                        '$regex':filter
                    }
                },
                {
                    lastname:{
                        '$regex':filter
                    }
                }
            ]
        }).select('-password');

        const finalData = response.map(User => ({
            _id:User._id,
            username:User.username,
            firstname:User.firstname,
            lastname:User.lastname
        }))
    
        console.log(finalData)
        res.json({
          finalData,
        });
    }
    catch(e){
        console.log(e)
    }

    

}
