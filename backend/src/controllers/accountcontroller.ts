import { type Response, type Request } from "express";
import { User, UserBalance } from "../db.js";
import mongoose from "mongoose";
export const getBalance = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.userId;
  console.log(userId, "on getBalance route");

  try {
    const response = await UserBalance.findOne({
      userId: userId,
    });
    console.log(response);
    res.status(200).json({
      balance: response?.balance,
    });
  } catch (e) {
    res.status(500).send(e);
  }
};

export const transferMoney = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  // @ts-ignore
  const userId = req.userId;
  // const to = req.params.to;
  
    session.startTransaction();

    const { amount, to } = req.body;

    const account = await UserBalance.findOne({
      userId: userId,
    });

    const currentBalance = account?.balance;
    if (!currentBalance) return;

    if (!account || currentBalance < amount) {
        await session.abortTransaction();
      return res.status(400).json({
        message: "Insufficient Balance!",
      });
    }

    const toAccount = await UserBalance.findOne({userId:to});

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message:"Invalid account"
        })
    }

    await UserBalance.updateOne({userId:userId},{$inc:{balance: - amount}}).session(session);
    await UserBalance.updateOne({userId:to},{$inc:{balance: + amount}}).session(session);

    await session.commitTransaction();
    res.status(200).json({
      message: "balance added!",
    });
  
};
