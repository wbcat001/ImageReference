import React, { useState, useCallback, useEffect } from 'react';
import apiRequest from '../lib/apiRequest';

import BrightnessAnalysis from './BrightnessAnalysis';
import ColorAnalysis from './ColorAnalysis';

import { Box, Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2"
import AddAnalysisComponent from './AddAnalysisComponent';
import { useLocation } from 'react-router-dom';

interface AnalyViewProps{
    defaulturl?: string
}
// 分析の種類
export type AnalysisType = "brightness" | "color";

type AnalysisComponent = {
    id: string,
    analysisType: AnalysisType,
}
// type
const sampleURL = "https://images.unsplash.com/photo-1606814893907-c2e42943c91f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjYxOTB8MHwxfHNlYXJjaHwxfHxnaXJsfGVufDB8fHx8MTczMDUzODExMXww&ixlib=rb-4.0.3&q=80&w=1080";

export const AnalyView: React.FC<AnalyViewProps> = ({defaulturl}) => {
    const location = useLocation();
    const imageUrl = location.state ?  location.state.url: sampleURL;
    // const [imageUrl, setImageUrl] = useState<string>("")
    
    console.log("image URL is ", imageUrl);
    
    // default component list, component list, main image
    // const [image, setImage] = useState
    const defaultAnalysisComponents: AnalysisComponent[] = [
        {id :"0", analysisType: "brightness"},
        {id :"1", analysisType: "color"},
        ]

    const [analysisComponents, setAnalysisComponents] = useState<AnalysisComponent[]>(defaultAnalysisComponents);
    
    
    // Add Component
    const handleAddAnalysisComponent = useCallback((analysisType: AnalysisType) => {
        const newAnalysisComponent: AnalysisComponent = {id: Date.now().toString(), analysisType:analysisType}
        setAnalysisComponents((prev) => [...prev, newAnalysisComponent]);
    }, []);
    // Delete Component
    const handleDeleteAnalysisComponent = useCallback((id: string) => {
        setAnalysisComponents((prev) => prev.filter((analysisComponent) => analysisComponent.id !== id));
    }, []);

    //
    const renderAnalysisComponent = (analysisComponent: AnalysisComponent) => {
        switch (analysisComponent.analysisType){
            case "brightness":
                return <BrightnessAnalysis 
                            id={analysisComponent.id}
                            url={imageUrl}
                            // fetchResult={(url) => Promise.resolve(Array.from({length:100}, () => Math.random()))}
                            onDelete={handleDeleteAnalysisComponent} />

            case "color":
                return <ColorAnalysis
                    id={analysisComponent.id}
                    url={imageUrl}
                    // fetchResult={(url) => Promise.resolve(['#FF0000', '#00FF00', '#0000FF'])}
                    onDelete={handleDeleteAnalysisComponent}/>
            default:
                return <div></div>;
        }
    }

 
    
    
    // useeffect?: imageの取得と表示
    
    // default dataの定義(color, brightness)
    
    // view
    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } , margin:2}}>

            
            <Typography component="h2" variant="h6" sx={{ mb: 1, mt:2 }}>image
            </Typography>
            <Divider sx={{m:2}}/>
            <Grid container spacing={2} columns={12}>
                <Grid size={{ xs: 10, lg: 9 }}>
                <img
                    src={imageUrl}
                    // alt={alt}
                    style={{
                    width: "100%", // 親コンテナに収まる
                    height: "auto", // アスペクト比を維持
                    display: "block", // 中央揃え
                    }}
                />
                </Grid>
            </Grid>

            <Typography component="h2" variant="h6" sx={{ mb: 1,mt:2 }}>detail</Typography>
            <Divider sx={{m:2}}/>
            <Grid container spacing={2} columns={12} 
                sx={{ mb: (theme) => theme.spacing(2) }}>
                {analysisComponents.map((analysisComponent) => (
                    <Grid size={{xs:12, sm:6, lg:6}}>
                        {renderAnalysisComponent(analysisComponent)}
                    </Grid >
                ))}
                    <Grid size={{xs:12, sm:6, lg:3}}>
                        <AddAnalysisComponent onAdd={handleAddAnalysisComponent}/>
                </Grid>
            </Grid>     
        </Box>
    )
    
}

export default AnalyView;