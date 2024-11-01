import { ImageData } from "../Model/ImageData";
import axios from "axios";
import dotenv from "dotenv";

export class ImageRetriever{
	private images: ImageData[] 
    private UNSPLASH_API_KEY: string;
	
	constructor(){
		this.images = [];
        try{
            this.UNSPLASH_API_KEY = "JaHUJ4k3diyFF7vEyQBX7XCzWJCRuKiF9BbZwjurJ5o";
            
        }catch(error){
            console.error(error);
            this.UNSPLASH_API_KEY = "no";
        }
	}
	
	public async retrieveImages(query: string): Promise<ImageData[]> {
        try{
            if (query == ""){query = "cat"}
            const response = await axios.get(`https://api.unsplash.com/search/photos?query=${query}&per_page=20&client_id=${this.UNSPLASH_API_KEY}`);
            
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

