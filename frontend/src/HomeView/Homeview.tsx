import * as React from "react";
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useState } from "react";

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { ImageData } from '../Model/ImageData';

import MasonryImageList from "../SearchView/ImageList";
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles'

const SampleImages: ImageData[] = [
    {url: "https://images.unsplash.com/photo-1549388604-817d15aa0110"},
    {url: "https://images.unsplash.com/photo-1525097487452-6278ff080c31"},
    {url: "https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee"},
    {url: "https://images.unsplash.com/photo-1481277542470-605612bd2d61"},
    {url: "https://images.unsplash.com/photo-1549388604-817d15aa0110"},
    {url: "https://images.unsplash.com/photo-1549388604-817d15aa0110"},
    {url: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3"},
    {url: "https://images.unsplash.com/photo-1549388604-817d15aa0110"},
    {url: "https://images.unsplash.com/photo-1481277542470-605612bd2d61"},
    {url: "https://images.unsplash.com/photo-1549388604-817d15aa0110"},
    {url: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3"},
    {url: "https://images.unsplash.com/photo-1481277542470-605612bd2d61"},
    {url: "https://images.unsplash.com/photo-1549388604-817d15aa0110"},
    {url: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3"},
    {url: "https://images.unsplash.com/photo-1481277542470-605612bd2d61"},
    {url: "https://images.unsplash.com/photo-1549388604-817d15aa0110"},
    {url: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3"},
    {url: "https://images.unsplash.com/photo-1481277542470-605612bd2d61"},
    {url: "https://images.unsplash.com/photo-1549388604-817d15aa0110"},
    {url: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3"},
  ]

  
const HomeView: React.FC = () =>  {

  const [images, setImages] = useState<ImageData[]>([]);
  const appTheme = useTheme()

 
      return (
        <ThemeProvider theme={appTheme}>
        <Box sx={{m: 2}}>
           
            <MasonryImageList images={SampleImages}/>
            
        </Box>
        </ThemeProvider>
    )
}

export default HomeView;