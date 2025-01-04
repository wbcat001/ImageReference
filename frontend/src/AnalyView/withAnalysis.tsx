import React, { useState, useEffect } from 'react';
import { AnalysisCard } from './AnalysisComponentCard';


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
          isLoading? (
            <div>loading design</div>
          ):(
            error? (<div>
              error design
            </div>

            ):
              <WrappedComponent {... (rest as P)} result={result} />
              
              
          )
          <div> 
                <button onClick={fetchData}></button>
                <button onClick={() => onDelete(id)}></button>
              </div>
          </AnalysisCard>
        )
    }
    return HOC;
}