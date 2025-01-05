import { Box } from '@mui/material';
import { withAnalysis } from './withAnalysis';
import React, { useEffect, useState } from 'react';
import apiRequest from '../lib/apiRequest';
type ColorAnalysisProps = {
    result: string[] 
};

// colorcode(need validate)
const sampleColorResult = Array.from({length: 10}, () => "#ffffff")

export const ColorAnalysis: React.FC<ColorAnalysisProps> = ({result}) => {
    // state: result, 
    const [colors, setColors] = useState<string[]>(result)
    // state(interactive): selected, clicked, num
    const [selectedColor, setSelectedColor] = useState<string>("");
    const [nColor, setNColor] = useState<number>(10);

    // handle: click(copy to clipboard)
    const handleClick = async (color: string) => {
        await global.navigator.clipboard.writeText(color)
    }
    
    
    return (<Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2, 
          justifyContent: "left", 
          alignItems: "center",
        }}
        id="color-box"
      >
        {colors.map((color: string) => 
            <Box
                sx={{
                width: 40, 
                height: 40,
                borderRadius: "50%", 
                backgroundColor: color, 
                border: "2px solid #fff", 
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", 
                cursor: "pointer", 
                transition: "transform 0.2s ease",
                "&:hover": {
                    transform: "scale(1.2)", 
                },
                }}
        ></Box>)}
    </Box>)

}

const fetchColors = async (url: string): Promise<string[]> => {
    let result:string[] = [];
    try{
        const options = {
            method: "POST",
            url: "/analy/color",
            data: {
                url: url
            }
        }

        const response = await apiRequest(options);
        result = response.data;
    }catch(e){
        console.error(e);
        await new Promise((res) => setTimeout(res, 500));
        result = sampleColorResult;
    }

    return result
}
ColorAnalysis.displayName = "Color"


export default withAnalysis(ColorAnalysis, fetchColors);