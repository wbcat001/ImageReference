import { Box, Grid, Slider, Typography } from "@mui/material";
import react, { useState, ReactNode } from "react";
import "./Tooltip.css";


interface TooltipProps{
    children: ReactNode;
    content: ReactNode;
    location: "top" | "bottom" | "left" | "right";
}

const Tooltip :React.FC<TooltipProps>= ({children, content, location}) => {
    const [visible, setVisible] = useState<boolean>(false);
    return <div className="tooltip-container">
        <div onMouseEnter={()=> setVisible(true)} onMouseLeave={()=>setVisible(false)}>
        {children}
        </div>
        {visible && <div className={location}>{content}</div>}
    </div>
}

export default Tooltip;