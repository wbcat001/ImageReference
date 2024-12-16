import express from "express";
import {NextFunction, Request, Response} from "express";
import prisma from "../lib/prisma.js"
import { loadImageFromUrl, processImageToGrayScale, saveImageToFile, createColorPalette} from "../lib/imageAnalysis/imageAnalysis";


export class ImageAnalysisController{

    static async processImage(req:Request, res:Response):
    Promise<void>{

        try{
            const {url} = req.body;
            const image = loadImageFromUrl(url);
            const processedImage = processImageToGrayScale(await image);
            const outputFileName = saveImageToFile(await processedImage);

            console.log(await outputFileName);
            
            res.status(200).json({message: "success"})
        }catch(error){
            console.error(error);
            res.status(500).json({message: "Failed to process image"})
        }
    }


    static async processImage2(req:Request, res:Response):
    Promise<void>{

        try{
            const {url} = req.body;
            const image = loadImageFromUrl(url);
            const colors = createColorPalette(await image);
            // const outputFileName = saveImageToFile(await processedImage);

            console.log(await colors);
            
            res.status(200).json(await colors);
        }catch(error){
            console.error(error);
            res.status(500).json({message: "Failed to process image"})
        }
    }

}