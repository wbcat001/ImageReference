import {NextFunction, Request, Response} from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma"

interface UserRegisterRequest extends Request{
    body:{
        userName: string;
        email: string;
        password: string;
    }
}

interface UserLoginRequest extends Request{
    body: {
        userName: string;
        password: string;
    }
}

export class AuthController {

    // login
    static async login(req: UserLoginRequest, res: Response, next: NextFunction) : Promise<void>{
        try{
            const {userName, password} = req.body;
            
            // Check User exist
            const user = await prisma.user.findUnique({
                where: {userName}
            })
            if(!user) {throw new Error("Invalid Credentials!");}

            // Check password is correct
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(!isPasswordValid) {
                throw new Error("Invalid Password!");;
            }

            
            // generate Cokkie Token
            const age = 1000* 60 * 60 * 24;
            const token = jwt.sign(
                {
                    id: user.id,
                    idAdmin: false,
                },
                process.env.JWT_SECRET_KEY!,
                {expiresIn: age}
            )


            const {password: userPassword, ...userInfo} = user;

            res.cookie("token", token,
                {
                    httpOnly: true,
                    maxAge: age,
                })
                .status(200)
                .json(userInfo)
            // return information
        }catch{
            res.status(401).send("Login is failed.");
        }
    }


    // register
    static async register(req: UserRegisterRequest, res: Response): Promise<void>{
        try{

            const {userName, email, password} = req.body;
            console.log(password)
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log(hashedPassword);

            // Create User, save to DB
            const newUser = await prisma.user.create({
                data: {
                    userName:userName,
                    email: email,
                    password: hashedPassword,
                },
            });

            console.log(newUser);

            res.status(201).json({message: "User created successfully."});
            
        }catch(error){
            console.error(error);
            res.status(500).json({message: "Failed to crate user."})
        }
    }

    // logout
    static async logout(req: Request, res: Response): Promise<void>{
        res.clearCookie("token").status(200).json({message: "Logout Succensfull"})
    }

}