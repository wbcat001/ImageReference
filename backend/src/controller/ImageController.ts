import express from "express";
import {NextFunction, Request, Response} from "express";
import prisma from "../lib/prisma.js"
import { ImageData } from "../model/Image";

interface SaveImageRequest extends Request{
    body: {
        imageId: string;
        url: string;
        id: string;
    }
}


export class ImageController{

    // Get user Image
    static async getImage(req:Request, res: Response): Promise<void>{
        

        try{
            const{num, id} = req.body;
            const tokenUserId = req.userId;


            // Autorize by token
            if(id != tokenUserId){
                res.status(403).json({message: "You are not Authorized!"})
                return;
            }
            const images = await prisma.image.findMany({
                where: {userId: id},
                orderBy:{
                    createdAt: "desc"
                }
            })

            console.log(images);

            res.status(200).json(images);

        }catch(error){
            console.error(error);
            res.status(500).json({message: "Failed to get user's image"});
        }
    }
    
    // Add Image to mylist
    static async addImage(req:SaveImageRequest, res: Response): Promise<void>{
        try{
            const {imageId, url, id} = req.body;
            // const id = req.params.id;

            const tokenUserId = req.userId;

            if(id!= tokenUserId){
                res.status(403).json({message:"You are not Authorized"})
                return;
            }
            
            // create new new row
            const savedImage = await prisma.image.findUnique({
                where:{
                    userId_imageId: {
                        userId: tokenUserId!,
                        imageId: imageId,
                    }
                }
            })

            console.log("saveedImage", savedImage)

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