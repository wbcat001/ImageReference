import Jimp from "jimp"
import { loadImageFromUrl } from "./imageAnalysis"
import { ImageProcesser } from "./imageProcesser";
import core from "./core.image";
import quantize from "quantize";


export class ColorProcesser extends ImageProcesser{
    static getAttribute = async (imagePath: string): Promise<quantize.RgbPixel[]> => {
        const image = await this.loadImage(imagePath);
        const palette = this.getPalette(image);
        return palette? palette : [[0,0,0]]
        
    }
    static getColor = (image: typeof Jimp, colorCount: number = 10, quality: number = 1): quantize.RgbPixel => {
        const palette = this.getPalette(image, colorCount, quality);
        return palette? palette[0] : [0, 0, 0];
    }

    static getPalette = (image: typeof Jimp, colorCount: number = 10, quality: number = 1): quantize.RgbPixel[] | null => {
        
        const pixelCount = image.bitmap.width * image.bitmap.height;

        // RGB array
        const pixelArray = core.createPixelArray(image, pixelCount, quality);

        const colorMap = quantize(pixelArray, colorCount);
        const palette = colorMap? colorMap.palette(): null;

        return palette;
    }

}


