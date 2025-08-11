import { type Response,type Request } from "express"
import { UserBalance } from "../db.js";
export const getBalance = async(req:Request,res:Response) => {
    // @ts-ignore
    const userId = req.userId;
    console.log(userId,"on getBalance route")

    try{
        const response = await UserBalance.findOne({
            userId:userId
        });
        console.log(response)
        res.status(200).json({
            balance:response?.balance
        })
    }
    catch(e){
        res.status(500).send(e);
    }

}