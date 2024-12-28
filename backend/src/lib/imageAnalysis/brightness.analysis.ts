import { ImageProcesser } from "./imageProcesser";
import core from "./core.image";
import Jimp from "jimp"


export class BrightnessProcesser extends ImageProcesser{
    static getAttribute = async (imagePath: string):
    Promise<number[]> => {
        const image = await this.loadImage(imagePath);
        const brightnessArray = this.getBrightnessArray(image);
        return brightnessArray
    }

    static getBrightnessArray = (image: typeof Jimp, quality: number = 1): number[] => {
        const brightnessArray: number[] = [];
        const width = image.bitmap.width;
        const height = image.bitmap.height;
        
        for (let y = 0; y < height; y += quality) {
            for (let x = 0; x < width; x += quality) {
                const color = image.getPixelColor(x, y); 
                const { r, g, b } = Jimp.intToRGBA(color); 
                const brightness = (r + g + b) / 3;
                brightnessArray.push(brightness);
            }
        }

        return brightnessArray;
    }
}