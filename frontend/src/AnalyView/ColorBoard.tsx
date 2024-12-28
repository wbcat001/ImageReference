import { Box, ButtonBase, Card, CardActionArea,Grid, CardContent, Slider, Typography } from "@mui/material";
import react, { useState, ReactNode, useRef } from "react";
import Tooltip from '@mui/material/Tooltip';
import Grid2 from "@mui/material/Grid2";
import useGetElementProperty from "../lib/useGetElementProperty";

const colors = [
    '#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#9B59B6',
    '#1ABC9C', '#E74C3C', '#2ECC71', '#3498DB', '#F39C12'
];


// Tooltip design
interface ContentProps {
    text: string
}

const Content: React.FC<ContentProps> = ({text}) => {
    return (
      <div>
        <p>{text}</p>
      </div>
    );
  };


// Color tile
const ColorBoard:React.FC = () => {
    const [clusterNum, setClusterNum] = useState<number>(2); 
    const targetRef = useRef(null);
    const width = useGetElementProperty(targetRef)
    
    // Select cluter num for k-means
    const handleNChange = (e:Event, n: number| number[]) =>{
        if(typeof n != "number"){return;}
        setClusterNum(n);
    }

    // Click -> Copy ColorCode to clipboard
    const handleClick = async (color: string) => {
        
        await global.navigator.clipboard.writeText(color);
    }
    

    return (
        <Card variant="outlined" sx={{ height: '100%', flexGrow: 1 }}>
            <Box ref={targetRef} sx={{m:2}}>
                <Typography textAlign="left" sx={{mb:1}} fontWeight="fontWeightBold">Color</Typography>
                <Slider
                    sx={{margitTop:10}} 
                    value={clusterNum}
                    onChange={handleNChange}
                  
                    min={2}
                    max={30}
                    aria-labelledby="input-item-number"
                    >
                    </Slider>
                
                <Grid container spacing={0} sx={{margin: {bottom:0, left:0, right:0, top:0}}}>
                    {colors.map((color, index) => (
                        (<Tooltip title={<Content text={color}/>} placement="right-start">  
                            <Grid item key={index} xs={1}>
                                <Card sx={{
                                    backgroundColor: color,
                                    display:"flex",
                                    height: 100,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    }}
                                    onClick={() => handleClick(color)}>
                                    <CardActionArea>
                                        <CardContent>
                                            <ColorCard color={color}/>
                                    
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>            
                        </Tooltip>)
                    ))}
                </Grid>
            </Box>

        </Card>
    )
}


interface ColorBoxProps{
    color: string;
}
const ColorCard: React.FC<ColorBoxProps> = ({color}) => {


    const [isClicked, setIsClicked] = useState<boolean>(false);
    const handleClick = async () => {
        const resultText = "test";
        
        await global.navigator.clipboard.writeText(resultText);
    }
  
    return (
        
        <Box
                    sx={{
                        backgroundColor: color,
                        height: 100,
                        
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      
                 
                       
                    }}
                   >
            {/* <Typography variant="body1" color="white" fontWeight="bold">
              {color}
            </Typography> */}
          </Box>

        
    )
}
export default ColorBoard;