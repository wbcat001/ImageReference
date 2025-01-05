import React, { useState } from 'react';
import { AnalysisCard } from './AnalysisComponentCard';
import { AnalysisType } from './AnalyView';
import { Box } from '@mui/material';

interface AddAnalysisComponentCardProps{
    onAdd: (analysisType: AnalysisType) => void;
}

const analysisTypeArray: AnalysisType[] = [
    "brightness", "color"
]


const AddAnalysisComponentCard: React.FC<AddAnalysisComponentCardProps> = ({onAdd}) => {
    
    // state: selected, hover, 
    const [isHover, setIsHover] = useState<boolean>(false);
    const [selectedType, setSelectedType] = useState<AnalysisType|null>(null);
    

    return (
        <AnalysisCard>
            <Box
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                >
                {isHover ? (
                    <ul style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
                    {analysisTypeArray.map((item, index) => (
                        <li key={index} style={{ padding: '4px 0', textAlign: 'center' }} onClick={() => onAdd(item)}>
                        {item}
                    </li>
                    ))}
                </ul>
                ):(
                    <Box sx={{textAlign: "center"}}>
                    <span style={{ fontSize: '100px', fontWeight: 'bold'}}>+</span>
                    </Box>
                )}
            </Box>         
        </AnalysisCard>
    )
}

export default AddAnalysisComponentCard