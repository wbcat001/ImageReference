import jwt, {JwtPayload} from "jsonwebtoken";
import {NextFunction, Request, Response} from "express";


declare module "express-serve-static-core" {
    interface Request{
        userId?: string
    }
}

// interface JwtRequest extends Request{
//     userId?: string;
// }

export const verifyToken = (req:Request, res:Response, next:NextFunction) => {
    const token = req.cookies.token;

    if(!token) {res.status(401).json({message: "You are not Authenticated."});
        return;
}

    jwt.verify(token, process.env.JWT_SECRET_KEY!, async (err: Error|null, payload:JwtPayload | string | undefined) =>{
        if(err) {return res.status(403).json({message: "token is not valid."});
            return;
    };
        
        const decodedPayload = payload as JwtPayload;
        req.userId = decodedPayload.id;
        next();
    }
)
}