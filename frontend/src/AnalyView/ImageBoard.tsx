import { Box, ButtonBase, Card, CardActionArea,Grid, CardContent, Slider, Typography } from "@mui/material";
import react, { useState, ReactNode, useRef, useEffect } from "react";
import Tooltip from '@mui/material/Tooltip';
import Grid2 from "@mui/material/Grid2";
import useGetElementProperty from "../lib/useGetElementProperty";
import apiRequest from "../lib/apiRequest";

interface ImageBoardProps {
    url: string
}

const ImageBoard: React.FC<ImageBoardProps> = ({url}) => {
    const targetRef = useRef(null);
    const width = useGetElementProperty(targetRef)
    const [imageData, setImageData] = useState<string | null>(null);

    useEffect(() => {
        const fetchImage = async () => {
            try{
                const options = {
                    method: "POST",
                    url: "/analy/image",
                    header: { "Content-Type": "application/json" },
                    data: {
                        url: url
                    }
                }
                const response = await apiRequest(options);
                setImageData(response.data);
            }catch(error){
                console.error(error);
            }
        }
        // fetchImage()
    })

    return (
        <Card variant="outlined" sx={{ height: '100%', flexGrow: 1 }}>
            <Box ref={targetRef} sx={{m:2}}>
                {url? <img src={url} alt="Fetched Image" />: <div>Loading...</div>}
            </Box>
        </Card>
    )
}

export default ImageBoard;