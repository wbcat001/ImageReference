import * as React from "react";
import {useState, useEffect} from "react";
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles'

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { ImageData } from '../Model/ImageData';
import { CircularProgress } from "@mui/material";

interface ImageListProps{
    images: ImageData[]

}

const MasonryImageList: React.FC<ImageListProps> = ({images}) =>  {
    const appTheme = useTheme();
    return (
      <ThemeProvider theme={appTheme}>
        <Box>
          <ImageList variant="masonry" cols={3} gap={8}>
            {images.map((image) => (
              <ImageListItem key={image.url}>
                <Card sx={{ width: 350 , backgroundColor: "background.default", boxShadow: 4}}>
                {/* <CardMedia
                    sx={{  width: 350, height: 100}}
                    image={image.url}
                    title="image"
                  /> */}
                    <AdjustedCardMedia width={350} imageUrl={image.url}/>
                </Card>
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </ThemeProvider>
    )
}

interface CardMediaProps{
  imageUrl: string;
  width: number;
}

const AdjustedCardMedia: React.FC<CardMediaProps> = ({imageUrl, width}) => {
  const [height, setHeight] = useState<number>(100);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [opacity, setOpacity] = useState<number>(0);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      const aspectRatio = img.width / img.height;
      setHeight(width / aspectRatio);
      setIsLoaded(true);
    };
    
    img.onerror = () => {
      console.error("Failed to show image");
    }
  }, [imageUrl, width]);

  useEffect(() => {
    if(isLoaded){
      setOpacity(1);
    }
  })

  return (
    <div>

    
      
      <CardMedia
      sx={{ width: width, 
            height: height,
            opacity: opacity,
            transition: 'opacity 1s ease-in-out, height 1s ease-in-out',
          
            }}
      image={imageUrl}
      title="image"
      
      />
    
    </div>
  )
}
export default MasonryImageList;