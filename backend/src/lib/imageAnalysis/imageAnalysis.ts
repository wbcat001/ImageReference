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



export class ImageProcesser{
    private image: typeof Jimp | null = null;
    
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

    static processImage = (image: typeof Jimp, processingFn: (image:typeof Jimp) => typeof Jimp): typeof Jimp => {
        const imageCopy = image.clone();
        return processingFn(imageCopy);

    }

    static processGrayScale = (image: typeof Jimp): typeof Jimp =>{
        const processImage = image.clone();

        return processImage.grayscale();
    }

    static processForShape = (image: typeof Jimp): typeof Jimp =>{
        const width = image.bitmap.width;
        const height = image.bitmap.height;
        const processImage = image.clone();
        // convert grayscale
        const grayScaledImage = image.grayscale();
        
        // resize (square)
        const resizedImage = grayScaledImage.resize(width, height);

        
        // convert to 3 group color
        const quantizedImage = resizedImage.posterize(3);
        // filter erosion, dilation (n times)
        let filteredImage = quantizedImage.clone();
        const iterations = 6;
        for (let i=0; i < iterations; i++){
            // filteredImage = filteredImage.convolute([
            //     [0, 1, 0],
            //     [1, 1, 1],
            //     [0, 1, 0],
            // ])

            filteredImage = this.maxFilter(filteredImage, 3)
        }

        for (let i = 0; i < iterations; i++) {
            // MinFilter (収縮)
            // filteredImage = filteredImage.convolute([
            //   [1, 1, 1],
            //   [1, -7, 1],
            //   [1, 1, 1],
            // ])
            filteredImage = this.minFilter(filteredImage, 3)
        }
        this.saveImage(quantizedImage);
        this.saveImage(filteredImage);

        return filteredImage;
    }

    static processForColor = (image: typeof Jimp): string[] => {
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
    }

    static maxFilter = (image: typeof Jimp, size: number): typeof Jimp =>{
        const width = image.bitmap.width;
        const height = image.bitmap.height;
        const resultImage = image.clone();

        // Iterate over each pixel of the image (ignoring edges based on filter size)
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let maxPixel = -Infinity;

                // Check surrounding pixels in the window defined by 'size'
                for (let j = -Math.floor(size / 2); j <= Math.floor(size / 2); j++) {
                    for (let i = -Math.floor(size / 2); i <= Math.floor(size / 2); i++) {
                    const xPos = x + i;
                    const yPos = y + j;

                    // Make sure the pixel is within bounds of the image
                    if (xPos >= 0 && xPos < width && yPos >= 0 && yPos < height) {
                        const pixelColor = image.getPixelColor(xPos, yPos);
                        const pixelValue = Jimp.intToRGBA(pixelColor).r; // Assume grayscale, use red channel for value
                        maxPixel = Math.max(maxPixel, pixelValue);
                    }
                    }
                }

                // Set the maximum pixel value to the result image
                resultImage.setPixelColor(Jimp.rgbaToInt(maxPixel, maxPixel, maxPixel, 255, ()=>{}), x, y);
                }
        }
  
        return resultImage;
    }

    static minFilter = (image: typeof Jimp, size: number): typeof Jimp => {
        const width = image.bitmap.width;
        const height = image.bitmap.height;
        const resultImage = image.clone();
      
        // Iterate over each pixel of the image (ignoring edges based on filter size)
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            let minPixel = Infinity;
      
            // Check surrounding pixels in the window defined by 'size'
            for (let j = -Math.floor(size / 2); j <= Math.floor(size / 2); j++) {
              for (let i = -Math.floor(size / 2); i <= Math.floor(size / 2); i++) {
                const xPos = x + i;
                const yPos = y + j;
      
                // Make sure the pixel is within bounds of the image
                if (xPos >= 0 && xPos < width && yPos >= 0 && yPos < height) {
                  const pixelColor = image.getPixelColor(xPos, yPos);
                  const pixelValue = Jimp.intToRGBA(pixelColor).r; // Assume grayscale, use red channel for value
                  minPixel = Math.min(minPixel, pixelValue);
                }
              }
            }
      
            // Set the minimum pixel value to the result image
            resultImage.setPixelColor(Jimp.rgbaToInt(minPixel, minPixel, minPixel, 255, ()=>{}), x, y);
          }
        }
        
        return resultImage;
      }

}



// Image process

//