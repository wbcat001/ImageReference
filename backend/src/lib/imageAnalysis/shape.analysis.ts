import Jimp from "jimp"
import { loadImageFromUrl } from "./imageAnalysis"
import { ImageProcesser } from "./imageProcesser";
import core from "./core.image";
import quantize from "quantize";

export class ShapeProcesser extends ImageProcesser{
    static getAttribute = async (imagePath: string): Promise<typeof Jimp> => {
        const image = await this.loadImage(imagePath);
        const shape = this.getShape(image);
        return shape;
        
    }

    static getShape = (image: typeof Jimp): typeof Jimp => {
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