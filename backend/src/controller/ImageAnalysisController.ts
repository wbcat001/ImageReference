import express from "express";
import {NextFunction, Request, Response} from "express";
import prisma from "../lib/prisma.js"
import { ImageProcesser } from "../lib/imageAnalysis/imageProcesser";

import { ColorProcesser } from "../lib/imageAnalysis/color.analysis";
import { ShapeProcesser } from "../lib/imageAnalysis/shape.analysis";
import { BrightnessProcesser } from "../lib/imageAnalysis/brightness.analysis";

export class ImageAnalysisController{

    // static async processImage(req:Request, res:Response):
    // Promise<void>{

    //     try{
    //         const {url} = req.body;
    //         const image = ImageProcesser.loadImage(url);
    //         const processedImage = ImageProcesser.processGrayScale(await image);
    //         const outputFileName = ImageProcesser.saveImage(processedImage);

    //         console.log(await outputFileName);
            
    //         res.status(200).json({message: "success"})
    //     }catch(error){
    //         console.error(error);
    //         res.status(500).json({message: "Failed to process image"})
    //     }
    // }


    // static async processImage2(req:Request, res:Response):
    // Promise<void>{
    //     try{
    //         const {url} = req.body;
    //         const image = ImageProcesser.loadImage(url);
    //         const colors = ImageProcesser.processForColor(await image);
    //         // const outputFileName = saveImageToFile(await processedImage);

    //         console.log(await colors);
            
    //         res.status(200).json(await colors);
    //     }catch(error){
    //         console.error(error);
    //         res.status(500).json({message: "Failed to process image"})
    //     }
    // }

    // static async processImage3(req: Request, res: Response): Promise<void>{
    //     try{
    //         const {url} = req.body;
    //         const image = ImageProcesser.loadImage(url);
    //         ImageProcesser.processForShape(await image);
    //         res.status(200).json({message: "success"});

    //     }catch(error){
    //         console.error(error);
    //     }

    // }

    static getColors = async (req: Request, res:Response): Promise<void> => {
        try{
            const {url} = req.body;
            const colors = ColorProcesser.getAttribute(url);

            res.status(200).json(await colors);
        }catch(error){
            console.error(error);
        }
    }

    // return url
    static getShape = async (req: Request, res: Response): Promise<void> => {
        try{
            const {url} = req.body;
            const shape = ColorProcesser.getAttribute(url);
            res.status(200).json(await shape);

        }catch(error){
            console.error(error);
        }
    }

    static getBrightness = async (req: Request, res: Response): Promise<void> => {
        try{
            const {url} = req.body;
            const brightness = BrightnessProcesser.getAttribute(url);
            res.status(200).json(await brightness);
        }catch(error){
            console.error(error);
        }
    }

    static getImage = async (req: Request, res: Response): Promise<void> => {
        try{
            const {url} = req.body;
            const imageData = ImageProcesser.getImage(url);
            res.status(200).json(await imageData)
        }catch(error){
            console.error(error);
        }
    }

}