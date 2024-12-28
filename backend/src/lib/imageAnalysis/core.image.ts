import Jimp from "jimp";
type RgbPixel = [number, number, number];
// create
const createPixelArray = (
    image: typeof Jimp,
    pixelCount: number,
    quality: number): RgbPixel[] =>{
        const width = image.bitmap.width;
        const height = image.bitmap.height;

        const pixelArray: RgbPixel[] = [];

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const color = image.getPixelColor(x, y);
                const {r, g, b} = Jimp.intToRGBA(color);
                pixelArray.push([r, g, b] as RgbPixel);
            }
        }
        return pixelArray;
    }

const getBase64 = async (image: typeof Jimp):Promise<string> =>{
    return image.getBase64Async("image/jpeg");
}

export default {
    createPixelArray,
    getBase64
}