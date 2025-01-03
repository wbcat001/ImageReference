import React, { useState, useEffect } from 'react';
import { AnalysisCard } from './AnalysisCard';


interface WithAnalysisProps{
    id: string,
    url: string, 
    fetchResult: (url: string) => Promise<any>,
    onDelete: (id: string) => void;
}

export const withAnalysis = <P extends object>(
    WrappedComponent: React.ComponentType<P>
  ) => {
    const HOC: React.FC<Omit<P, 'result'> & WithAnalysisProps> = ({
      id,
      url,
      fetchResult,
      onDelete,
      ...rest
    }) =>{
        // result, loading, error

        //fetchdata

        //useEffect: fetchdata

        // return component: loading, error, or result vis(), delete, rerender
    }
}