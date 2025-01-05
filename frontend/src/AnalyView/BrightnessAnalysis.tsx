import React, { useEffect, useState } from 'react';
import { CustomBarChart } from "./CustomBarChart";
import { withAnalysis } from './withAnalysis';
import apiRequest from '../lib/apiRequest';

type BrightnessAnalysisProps = {
    result: number[]
};

// Dummy Data
const sampleBrightnessArray = Array.from({length: 100}, () => Math.random())


export const BrightnessAnalysis: React.FC<BrightnessAnalysisProps> = ({result}) => {
    // const [result, setResult] = useState<number|null>(null);

    return <CustomBarChart brightnessArray={sampleBrightnessArray}/>

}

// Dummy api request
const fetchBrightness = async (url: string): Promise<number[]> => {
    let result:number[] = [];
    try{
        const options = {
            method: "POST",
            url: "/analy/brightness",
            data: {
                url: url
            }
        }

        const response = await apiRequest(options);
        result = response.data;
    }catch(e){
        console.error(e);
        await new Promise((res) => setTimeout(res, 500));
        result = sampleBrightnessArray;
    }

    return result
}
BrightnessAnalysis.displayName = "Brightness"

export default withAnalysis(BrightnessAnalysis, fetchBrightness);