// import {Jimp} from "jimp"
import Jimp from "jimp"

import axios from "axios";
import { promises as fs } from 'fs'
import path from "path";
// import { rgbaToInt } from "@jimp/utils";

// File Loader
export const loadImageFromUrl = async (imageUrl: string): Promise<typeof Jimp>=> {
    try{
        const response = await axios.get(imageUrl, {responseType: "arraybuffer"})
        const imageBuffer = Buffer.from(response.data)
        return await Jimp.read(imageBuffer)
    }catch(error){
        throw new Error("Failed to load image from URL: ${error.massage}")
    }
}


export const processImageToGrayScale = async (image: typeof Jimp): Promise<typeof Jimp> => {
    try{
        image.grayscale();
        return image;

    }catch(error){
        throw new Error("Failed to process image ${error.message")
    }
}

export const createColorPalette = async (image: typeof Jimp): Promise<string[]> => {
    
    try{
        const numColors = 10;
        const colorMap: {[key: string]: number} = {};

        const width = image.bitmap.width;
        const height = image.bitmap.height;

        for (let y=0; y < height; y++){
            for( let x=0; x < width; x++){
           const color = image.getPixelColor(x, y);
           const {r, g, b} = Jimp.intToRGBA(color)
           const hexColor = "#" + Jimp.rgbaToInt(r, g, b, 255, ()=>{}).toString(16).padStart(8, '0').slice(0, 6);
         
        //    const hex =  `${hexColor.r},${hexColor.g},${hexColor.b}`;

           if(colorMap[hexColor]){
            colorMap[hexColor]++;
           }else{
            colorMap[hexColor] = 1;
           }
        }};
        const sortedColors = Object.entries(colorMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, numColors)
        .map(([color, count]) => color)

        console.log("Top colors", sortedColors);


        return sortedColors;

    }catch(error){
        throw new Error("Failed to extract color palette");
    }
}


export const saveImageToFile = async (image: typeof Jimp): Promise<string> => {
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

const shape = async (image: typeof Jimp): Promise<void> => {
    try{
        const width = image.bitmap.width;
        const height = image.bitmap.height;
        // convert grayscale
        const grayScaledImage = image.grayscale();
        
        // resize (square)
        const resizedImage = grayScaledImage.resize(width, height);
        // convert to 3 group color
        const quantizedImage = resizedImage.posterize(3);
        // filter erosion, dilation (n times)
        let filteredImage = quantizedImage;
        const iterations = 6;
        for (let i=0; i < iterations; i++){
            filteredImage = filteredImage.convolute([
                [0, 1, 0],
                [1, 1, 1],
                [0, 1, 0],
            ])
        }

        for (let i = 0; i < iterations; i++) {
            // MinFilter (収縮)
            filteredImage = filteredImage.convolute([
              [1, 1, 1],
              [1, -7, 1],
              [1, 1, 1],
            ])
        }
        // return filteredImage;
        
    }catch(error){
        console.error("Failed to process for shape", error);
    }
}



// Image process

//