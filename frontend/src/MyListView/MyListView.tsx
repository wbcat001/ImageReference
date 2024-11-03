import * as React from "react";
import { useState, useContext, useEffect } from "react";
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles'
import MasonryImageList from "../SearchView/ImageList";
import { TextField } from "@mui/material";
import { Box } from "@mui/material";
import { ImageData, SavedImageData } from "../Model/ImageData";
import apiRequest from "../lib/apiRequest";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../Context/AuthContext";

const getImages = async (userId: string): Promise<SavedImageData[]> => {
    try{

        const options = {
            method: "POST",
            url: "/mylist",
            
            data: {
                num: 10,
                id: userId
            }
        }
        const response = await apiRequest(options);
        
        const images: SavedImageData[] = response.data;

        return images;
    }catch(error){
        console.error("Failed to get user's image", error);
        return [];
    }

    
}


const MyListView: React.FC = () => {
    const [images, setImages] = useState<ImageData[]>([]);
    const {updateUser, getUser, currentUser} = useContext(AuthContext);
    const navigate = useNavigate();
    const appTheme = useTheme()

    useEffect(() => {

        console.log("currentUser", currentUser)
        if (!currentUser){
            
            navigate("/SignIn");
            return;
        }
        else{
        const fetchImages = async () =>{
            const userImages = await getImages(currentUser!.id)
            setImages(userImages);
        }
        fetchImages();
    }
    }, [currentUser])


    return (
        <div>
            <Box sx={{m: 2}}>
                <MasonryImageList images={images}></MasonryImageList>
            </Box>
                
        </div>
    )
}

export default MyListView;