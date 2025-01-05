import React, { useState, useEffect } from 'react';
import { AnalysisCard } from './AnalysisComponentCard';
import { Box, Button, CardContent, Typography } from '@mui/material';
import { AnalysisType } from './AnalyView';


interface WithAnalysisProps{
    id: string,
    url: string, 
    // analysisType: AnalysisType
    // fetchResult: (url: string) => Promise<any>,
    onDelete: (id: string) => void;
}

export const withAnalysis = <P extends object>(
    WrappedComponent: React.ComponentType<P>, fetchResult: (url: string) => Promise<any>
  ) => {
    const HOC: React.FC<Omit<P, 'result'> & WithAnalysisProps> = ({
      id,
      url,
      // fetchResult,
      onDelete,
      ...rest
    }) =>{
        // result, loading, error

        const [result, setResult] = useState<any|null>(null);
        const [isLoading, setIsLoading] = useState<boolean>(true);
        const [error, setError] = useState<string>("");
        //fetchdata
        const fetchData = async () => {
          try{
            const data = await fetchResult(url);
            setResult(data);
          }catch(error: unknown){
            if (error instanceof Error)
            setError(error.message)
          }finally{
            setIsLoading(false);
          }

        };
        //useEffect: fetchdata
        useEffect(() =>{
          fetchData();
        },[url])
        // return component: loading, error, or result vis(), delete, rerender

        return (
          <AnalysisCard>
            
            
          {isLoading? (
            <div>loading design</div>
          ):(
            error? (<div>
              error design
            </div>

            ):
            <div>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
               <Typography variant="h6">{WrappedComponent.displayName}</Typography>
               <Box>
                <Button variant="contained" color="primary" size="small"  onClick={fetchData}>Re</Button>
                <Button variant="contained" color="primary" size="small" onClick={() => onDelete(id)}>Delete</Button>
              </Box>
            </Box>
            
            <CardContent
                sx={{
                  // flexGrow: 1,
                  // display: "flex",
                  // justifyContent: "center",
                  // alignItems: "center",
                }}
              >
              
              <WrappedComponent {... (rest as P)} result={result} />
              </CardContent>
            </div>
              
          )}
          
        
          </AnalysisCard>
        )
    }
    return HOC;
}