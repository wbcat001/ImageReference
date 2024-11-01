import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'

import MasonryImageList from './SearchView/ImageList';
import SideBar from './Main/SideBar';
import { ImageData } from './Model/ImageData';
import Grid from '@mui/material/Grid';
import SearchView from './SearchView/SearchView';
import { Paper } from '@mui/material';
import SignIn from './SignIn/SingIn';
import SignUp from './SignUp/SignUp';
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

function App() {
  
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#d87274",
        light: "#ffa2a3",
        dark: "#a34449",
      },
      secondary: {
        main: '#ff4081', 
        light: '#ff79b0', 
        dark: '#c60055', 
      },
      background: {
        default: "#f5f5f5",
        paper: "#ffffff",

      },
      text:{
        primary: '#333333', // メインの文字色
        secondary: '#555555', // サブの文字色
      },
      info: {
        main: '#0288d1', // 情報表示に使う青色
      },
      success: {
        main: '#388e3c', // 成功表示に使う緑色
      },
      error: {
        main: '#d32f2f', // エラー表示に使う赤色
      },
      warning: {
        main: '#ffa000', // 警告表示に使うオレンジ色
      },
    }
  })
  
  return (
    <div className="App">
      <CssBaseline />
      <ThemeProvider theme={theme}>
      <BrowserRouter>
      <Grid container spacing={0}>
      <Grid item xs={2} sx={{ position: 'sticky', top: 0, height: '100vh' }}>
        <Paper sx={{ height: '100%', overflow: 'auto' , backgroundColor: "background.paper"}}>
          <SideBar/>
        </Paper>
        </Grid>
        <Grid item xs={10}>
          <Routes>
            <Route path="/" element={<MasonryImageList images={SampleImages}/>} />
            <Route path="/Search" element={<SearchView/>} />
            <Route path="/SignUp" element={<SignUp/>}/>
            <Route path="/SignIn" element={<SignIn/>}/>
            
          </Routes>
        </Grid>
      </Grid>
      </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
