
import * as React from "react";
import { useState } from "react";
import MasonryImageList from "./ImageList";
import { TextField } from "@mui/material";
import { Box } from "@mui/material";

import { Image } from "../Model/ImageData";
import Button from "@mui/material";
import { ImageRetriever } from "../ImageRetriever/ImageRetriever";



const SearchView: React.FC = () => {
    const [word, setWord] = useState<string>("");
    const [images, setImages] = useState<Image[]>([]);
    const imageRetriever = new ImageRetriever();

    const onHandleEnter = async () =>{
        console.log("enter", word);
        setImages(await imageRetriever.retrieveImages(word));
    }
    return (
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
    )
}


export default SearchView;