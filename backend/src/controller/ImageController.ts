import express from "express";
import {NextFunction, Request, Response} from "express";
import prisma from "../lib/prisma.js"


interface SaveImageRequest extends Request{
    body: {
        imageId: string;
        url: string;
    }
}
export class ImageController{

    // Get user Image
    // static async getImage(req:Request, res: Response): Promise<void>{
    //     try{
    //         const 
    //     }
    // }
    
    // Add Image to mylist
    static async addImage(req:SaveImageRequest, res: Response): Promise<void>{
        try{
            const {imageId, url} = req.body;
            const tokenUserId = req.userId;
            
            // create new new row
            const savedImage = await prisma.image.findUnique({
                where:{
                    userId_imageId: {
                        userId: tokenUserId!,
                        imageId
                    }
                }
            })

            if(!savedImage){
                await prisma.image.create({
                    data:{
                        userId: tokenUserId!,
                        imageId: imageId,
                        url: url
                    }
                })
            }

            res.status(200).json({
                message: "Image is saved"
            })

            // if user dont login

            
        }catch(error){
            console.error(error);
            res.status(500).json({message: "Failed to save Image..."})
        }
    }

    // Update Image

    // Delete Image


}