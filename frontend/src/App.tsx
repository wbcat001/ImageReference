import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";


import MasonryImageList from './SearchView/ImageList';
import SideBar from './Main/SideBar';
import { Image } from './Model/ImageData';
import Grid from '@mui/material/Grid';
import SearchView from './SearchView/SearchView';

const SampleImages: Image[] = [
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

function App() {
 
  
  return (
    <div className="App">
       <BrowserRouter>
      <Grid container spacing={2} height={800}>
        <Grid item xs={2}>
          <SideBar/>
        </Grid>
        <Grid item xs={10}>
          <Routes>
            <Route path="/" element={<MasonryImageList images={SampleImages}/>} />
            <Route path="/Search" element={<SearchView/>} />
            
          </Routes>
        </Grid>
      </Grid>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
