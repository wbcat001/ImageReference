
import * as React from "react";
import { useState } from "react";
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles'
import MasonryImageList from "./ImageList";
import { TextField } from "@mui/material";
import { Box } from "@mui/material";

import { ImageData } from "../Model/ImageData";
import Button from "@mui/material";
import { ImageRetriever } from "../ImageRetriever/ImageRetriever";

import axios from "axios";
import apiRequest from "../lib/apiRequest";
const SearchView: React.FC = () => {
    const [word, setWord] = useState<string>("");
    const [images, setImages] = useState<ImageData[]>([]);
    const imageRetriever = new ImageRetriever();
    const appTheme = useTheme()

    const onHandleEnter = async () =>{
        console.log("enter", word);
        
        try{
            const options = {
                method: "POST",
                url: "http://localhost:3001/api/image",
                headers: { "Content-Type": "application/json" },
                data: {
                    query: word,
                    num: 30,
                }
            }
            const response = await apiRequest(options);

            const newImages:ImageData[] = []
            for (const value of response.data){
                const newImage: ImageData = {
                    url: value.url
                }
                newImages.push(newImage);
            }
            setImages(newImages);
            console.log("retrieve response", newImages);

            console.log("images", images);
        }catch(error){
            console.error("Failed to get images", error);
            setImages(await imageRetriever.retrieveImages(word));
        }
    }
    return (
        <ThemeProvider theme={appTheme}>
        <Box sx={{m: 2}}>
            <TextField id="outlined-basic" 
            label="Search" 
            variant="outlined"    
           
            onChange={e => {
                setWord(e.target.value)      
            }}
            onKeyDown={e => {
                if (e.keyCode === 13) {
                  onHandleEnter();
                }
            }}
            />
        
            <MasonryImageList images={images}/>
            
        </Box>
        </ThemeProvider>
    )
}


export default SearchView;