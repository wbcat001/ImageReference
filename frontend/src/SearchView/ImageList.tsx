import * as React from "react";
import {useState, useEffect, useContext, useRef} from "react";
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles'

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { ImageData } from '../Model/ImageData';
import { CircularProgress } from "@mui/material";
import CardActions from "@mui/material/CardActions";


import Button from '@mui/material/Button';

import { AuthContext } from "../Context/AuthContext";
import apiRequest from "../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import { RefObject } from "react";
import { Skeleton } from '@mui/material';

type DOMRectProperty = keyof Omit<DOMRect, 'toJSON'>;

const useGetElementProperty = <T extends HTMLElement>(elementRef: RefObject<T>) =>{
  const [width, setWidth] = useState<number>(window.innerWidth);

  const getProperty = (targetProperty: DOMRectProperty): number =>{
    const clientRect = elementRef.current?.getBoundingClientRect();
      if (clientRect){
        return clientRect[targetProperty];
      }
      return 0;
  }

  useEffect(() =>{

    setWidth(getProperty("width"));
    const handleResize = () => {
      console.log("width", getProperty("width"));
      
      setWidth(getProperty("width"));
    }
    window.addEventListener("resize", handleResize);

    return () =>{
      window.removeEventListener("resize", handleResize);
    }
  }, []);

  return width;
}

//// Image List with masonry layout
interface ImageListProps{
    images: ImageData[]

}

const MasonryImageList: React.FC<ImageListProps> = ({images}) =>  {
    const appTheme = useTheme();
    const targetRef = useRef(null);
    const width = useGetElementProperty(targetRef);
    
    const [col, setCol] = useState<number>(3);

    return (
      <ThemeProvider theme={appTheme}>
        <div ref={targetRef}>
        <Box >
          <ImageList variant="masonry" cols={col} gap={10}>
            {images.map((image, index) => (
              <ImageListItem key={index}>
                    <AdjustedCardMedia width={ width/col - 10} image={image}/>
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
        </div>
      </ThemeProvider>
    )
}




//// Each Image Card
interface CardMediaProps{
  image: ImageData;
  width: number;
}

const AdjustedCardMedia: React.FC<CardMediaProps> = ({image, width}) => {
  const [height, setHeight] = useState<number>(100);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [opacity, setOpacity] = useState<number>(0);
  const navigate = useNavigate();
  const {currentUser, getUser} = useContext(AuthContext)

  useEffect(() => {
    const img = new Image();
    img.src = image.url;

    img.onload = () => {
      const aspectRatio = img.width / img.height;
      setHeight(width / aspectRatio);
      setIsLoaded(true);
    };
    
    img.onerror = () => {
      console.error("Failed to show image");
    }
  }, [image, width]);

  useEffect(() => {
    if(isLoaded){
      setOpacity(1);
    }
  })

  const handleAddButtonClicked = async (image:ImageData) => {
    const url = image.url
    alert(url);
    if(!currentUser){
      navigate("/SignIn");
      return;
    }

    try{

    const options = {
      method: "POST",
      url: "/mylist/add",
      data: {
        url: url,
        imageId: url,
        id: currentUser.id
      }
    }

    const response = await apiRequest(options);

    console.log(response);
    }catch(error){
      console.error("Failed to add image to mylist.");

    }
  }

  return (
    <div>
      {isLoaded ? ( 
      <Card sx={{ width: width  , backgroundColor: "background.default", boxShadow: 4,
        '&:hover .hover-actions': {
          opacity: 1, // Button appear
        },
      }}>
      
      <CardMedia
      sx={{ width: width, 
            height: height,
            opacity: opacity,
            transition: 'opacity 1s ease-in-out',
            }}
      image={image.url}
      title="image"
      
      />
      <CardActions
        className="hover-actions" // button hover animation
        sx={{
          opacity: 0, 
          transition: 'opacity 0.3s ease', 
          position: 'absolute', 
          bottom: 5, 
          left: 5,
        }}
        > 
        <Button size="medium" variant="contained" 
          onClick={() =>handleAddButtonClicked(image)}>
            Add
        </Button>
       
      </CardActions>
      
      </Card>)
      : 
      (
        <Skeleton variant="rectangular" width="100%" height={400} />
      )
    }
   </div>
   
  )
}
export default MasonryImageList;