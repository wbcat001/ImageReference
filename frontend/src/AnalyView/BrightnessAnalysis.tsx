import React, { useEffect, useState } from 'react';

type BrightnessAnalysisProps = {
    id: string;
    url: string;
};

export const BrightnessAnalysis: React.FC<BrightnessAnalysisProps> = ({id, url}) => {
    const [result, setResult] = useState<number|null>(null);


    useEffect(() => {
        if (!url) return;


    }, [url]);

    return <div></div>

}