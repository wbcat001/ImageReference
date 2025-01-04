

import React, { useState, useCallback } from 'react';
import BrightnessAnalysis from './BrightnessAnalysis';
import ColorAnalysis from './ColorAnalysis';
import ContrastAnalysis from './ContrastAnalysis';

interface AnalyViewProps{
    url: string
}
// 分析の種類
type AnalysisType = "brigntness" | "color";

type AnalyComponent = {
    id: number,
    analysisType: AnalysisType,
}
// type

export const AnalysView: React.FC<AnalyViewProps> = ({url}) => {
    // default component list
    //
}