import axios from "axios";
import dotenv from "dotenv";

import { ImageData } from "../model/Image";

export class ImageRetriever{
    private images: ImageData[] 
    private UNSPLASH_API_KEY: string;
    private defaultImageNum: number;

    constructor(){
        this.images = [];
        this.defaultImageNum = 30;
        try{
            this.UNSPLASH_API_KEY = process.env.UNSPLASH_API_KEY!;
            
        }catch(error){
            console.error(error);
            this.UNSPLASH_API_KEY = "no";
        }
    }

    public async retrieveImages(query: string, num: number): Promise<ImageData[]> {
        try{
            if(!num){num = this.defaultImageNum}
            if (query == ""){query = "cat"}
            const response = await axios.get(`https://api.unsplash.com/search/photos?query=${query}&per_page=${num}&client_id=${this.UNSPLASH_API_KEY}`);
            
            this.images = response.data.results.map((item: any) => ({url: item.urls.regular} ))
            console.log(this.images);
            return this.images;

        }
        catch(error){
            console.log(error);
            return [];

        }
	}
	
	public clearImages =  () => {
        this.images = [];
    };
}