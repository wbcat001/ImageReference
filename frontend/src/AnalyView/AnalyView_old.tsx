import React from "react";
import { CustomBarChart } from "./CustomBarChart";
import ImageBoard from "./ImageBoard";
import ColorBoard from "./ColorBoard";
import { Box, Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2"

interface AnalyViewProps{
    url: string,
}
const sampleArray = Array.from({length: 100}, () => Math.random())
const AnalyView: React.FC<AnalyViewProps> = ({url}) => {


    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } , margin:2}}>

            <Typography component="h2" variant="h6" sx={{ mb: 1, mt:2 }}>image
            </Typography>
            <Divider sx={{m:2}}/>
            <Grid container spacing={2} columns={12}>
                <Grid size={{ xs: 12, lg: 9 }}>
                   <ImageBoard url={url}/>
                </Grid>
            </Grid>

            <Typography component="h2" variant="h6" sx={{ mb: 1,mt:2 }}>detail</Typography>
            <Divider sx={{m:2}}/>
            <Grid container spacing={2} columns={12} 
            sx={{ mb: (theme) => theme.spacing(2) }}>
                <Grid size={{xs:12, sm:6, lg:3}}>
                    <ColorBoard/>
                </Grid >
                
                <Grid size={{xs:12, sm:6, lg:3}}>
                    <CustomBarChart brightnessArray={sampleArray}/>
                </Grid>
                
            </Grid>
            


            
        </Box>
    );
}

export default AnalyView;

         {/* <CustomBarChart brightnessArray={sampleArray}/>
            <ColorBoard/> */}