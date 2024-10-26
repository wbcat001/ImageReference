import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import {NextFunction, Request, Response} from "express";


export class UserController{

    static async getUsers(req:Request, res:Response): Promise<void>{
        try{
            const users = await prisma.users.findMany();
            res.status(200).json(users);
        }catch(error){
            console.error(error);
            res.status(500).json({message: "Faild to get all users"})
        }
    }

    static async getUser(req: Request, res: Response): Promise<void>{
        try{

            const {id} = req.params;
            const user = await prisma.users.findUnique({
                where: {id},
            })
            res.status(200).json(user);
        }catch(error){
            console.error(error);
            res.status(500).json({message: "Failed to get user"})
        }
    }
}