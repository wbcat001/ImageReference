import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles';

import MasonryImageList from './SearchView/ImageList';
import SideBar from './Main/SideBar';
import { ImageData } from './Model/ImageData';
import Grid from '@mui/material/Grid';
import SearchView from './SearchView/SearchView';
import { Paper } from '@mui/material';
import SignIn from './SignIn/SingIn';
import SignUp from './SignUp/SignUp';
import MyListView from "./MyListView/MyListView";
import { AuthContextProvider } from './Context/AuthContext';
import AnalyView from "./AnalyView/AnalyView";
import HomeView from './HomeView/Homeview';

import {useMediaQuery} from '@mui/material';

import { TransitionPageWrapper } from './TestView/UseTransition';
import { AnimatePresence } from 'framer-motion';
import AnimatedLayout from './TestView/AnimatedLayout';
import CustomPointer, {Pointer} from './hooks/Pointer';
import useMousePosition from './hooks/useMousePosition';


function App() {

  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const location = useLocation();
  const locationArr = location.pathname?.split("/") ?? [];
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      ...(isDarkMode) ?
      { // Dark theme
      primary: {
        main: "#620921",
        light: "#813A4D",
        dark: "#440617",
        contrastText:"#fff"
      },
      secondary: {
        main: '#dae0ec', 
        light: '#E1E6EF', 
        dark: '#989CA5', 
        contrastText:"#000000"
      },
      background: {
        default: "#141416",
        paper: "#312e2e",

      },
      text:{
        primary: '#fff', 
        secondary: "rgba(255, 255, 255, 0.7)", 
        disabled: "rgba(255, 255, 255, 0.5)"
      },
      info: {
        main: '#0288d1', 
      },
      success: {
        main: '#388e3c',
      },
      error: {
        main: '#d32f2f',
      },
      warning: {
        main: '#ffa000',
      },
      // action: {
      //   selected: "#440617",
      //   hover: "#813A4D",
      //   focus: "#f0f2f7"
      // },
      divider: "rgba(0, 0, 0, 0.12)"


    }
    :
    { // Light theme
      primary: {
        main: "#620921",
        light: "#813A4D",
        dark: "#440617",
        contrastText:"#fff"
      },
      secondary: {
        main: '#292d31', 
        light: '#53575A', 
        dark: '#1C1F22', 
      },
      background: {
        default: "#dae0ec",
        paper: "#f0f2f7",

      },
      text:{
        primary: '#333333', 
        secondary: '#555555', 
      },
      info: {
        main: '#0288d1', 
      },
      success: {
        main: '#388e3c',
      },
      error: {
        main: '#d32f2f',
      },
      warning: {
        main: '#ffa000',
      },
      // action: {
      //   selected: "#440617",
      //   hover: "#813A4D",
      //   focus: "#f0f2f7"
      // },
      divider: "rgba(0, 0, 0, 0.12)"

    }
    }
  })
  const mousePosition = useMousePosition()
  return (
    
   <div>

      <CssBaseline />
      
      <ThemeProvider theme={theme}>
       
      <AuthContextProvider>
      <Grid container spacing={0}>
      <Grid item xs={2} sx={{ position: 'sticky', top: 0, height: '100vh' }}>
        <Paper sx={{ height: '100%', overflow: 'auto' , backgroundColor: "primary.main"}}>
          <SideBar/>
        </Paper>
        </Grid>
        <Grid item xs={10} className="main-view">
        <Paper sx={{ height: '100%', overflow: 'auto' , backgroundColor: "background.defalut"}}>
          <Routes location={location} key={locationArr[1]}>
            <Route path="/" element={<AnimatedLayout><HomeView/></AnimatedLayout>} />
            <Route path="/Search" element={<AnimatedLayout><SearchView/></AnimatedLayout>} />
            <Route path="/SignUp" element={<AnimatedLayout><SignUp/></AnimatedLayout>} />
            <Route path="/SignIn" element={<AnimatedLayout><SignIn/></AnimatedLayout>} />
            <Route path="/MyList" element={<AnimatedLayout><MyListView/></AnimatedLayout>} />
            <Route path="/Analy" element={<AnimatedLayout><AnalyView/></AnimatedLayout>} />
            
          </Routes>
          </Paper>
        </Grid>
        
      </Grid>
      </AuthContextProvider>
      </ThemeProvider>
      <CustomPointer mousePosition={mousePosition}/>

   </div>
    
  );
}

export default App;
