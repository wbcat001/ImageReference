import {NextFunction, Request, Response} from "express";
import { ImageRetriever } from "./ImageRetriever";
import { ImageData} from "../model/Image";

interface ImageRetrieveRequest extends Request{
    body: {
    query: string;
    num: number;
    }
}

export class ImageRetrieveController{
    static async getImages(req: ImageRetrieveRequest, res:Response): Promise<void>{
        try{
            const {query, num} = req.body;

            const retriever = new ImageRetriever()
            const images: ImageData[] = await retriever.retrieveImages(query, num)
            console.log("query", query)
            
            res.status(200).json(images)
        }catch(error){
            console.error(error);
            res.status(500).json({message: "Failed to get image"})
        }
    }
}
