// import {Jimp} from "jimp"
import Jimp from "jimp"

import axios from "axios";
import { promises as fs } from 'fs'
import path from "path";
import core from "./core.image";

export class ImageProcesser{
    protected image: typeof Jimp | null = null;
    
    static loadImage = async (imageUrl: string): Promise<typeof Jimp>=> {
        try{
            const response = await axios.get(imageUrl, {responseType: "arraybuffer"})
            const imageBuffer = Buffer.from(response.data)
            return await Jimp.read(imageBuffer)
        }catch(error){
            throw new Error("Failed to load image from URL: ${error.massage}")
        }
    }


    static saveImage = async (image: typeof Jimp): Promise<string> => {
        try {
    
            // Ensure output dirctory exists
            const outputDir = path.resolve(__dirname, "../output");
            await fs.mkdir(outputDir, {recursive: true});
    
            // Generate unique file name
            const outputFileName = `grayyscale_${Date.now()}.jpg`
            const outputPath = path.join(outputDir, outputFileName);
    
            // Save file
            await image.writeAsync(outputPath);
    
            return outputPath;
    
    
        }catch(error){
            throw new Error("Failed to save output file")
        }
    }

    static getImage = async (imagePath: string) =>{
        
        const image = this.loadImage(imagePath);
        const imageData = await core.getBase64(await image);
        return imageData;
    }
}