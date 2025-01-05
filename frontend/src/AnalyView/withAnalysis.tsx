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

interface LoadingComponentProps {
  isLoading: boolean;
  children: React.ReactNode;
}

const LoadingComponent: React.FC<LoadingComponentProps> = ({ isLoading, children }) => {
  const [isRendered, setIsRendered] = useState(false); // アニメーション中の表示状態管理

  useEffect(() => {
    if (!isLoading) {
      // isLoadingがfalseになるとアニメーションを開始
      setTimeout(() => setIsRendered(true), 300); // アニメーション後の完全表示
    }
  }, [isLoading]);

  return (
    <Box
      sx={{
        opacity: isLoading ? 0 : 1, // 透明度の切り替え
        transition: "opacity 10s ease-in-out", // 透明度アニメーション
        // pointerEvents: isLoading ? "none" : "auto", // ロード中は操作不可
        // transform: isRendered ? "scale(1)" : "scale(0.95)", // 少し縮小から拡大
        // transitionDelay: isLoading ? "0s" : "0.3s", // 遅延設定
      }}
    >
      {children}
    </Box>
  );
};

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
            <LoadingComponent isLoading={isLoading}>
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
              
              <WrappedComponent {... (rest as P)} result={result}/>
              </CardContent>
            </LoadingComponent>
              
          )}
          
        
          </AnalysisCard>
        )
    }
    return HOC;
}