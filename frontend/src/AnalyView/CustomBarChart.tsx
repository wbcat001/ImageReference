import { BarChart } from '@mui/x-charts/BarChart';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BarChartProps,  } from '@mui/x-charts/BarChart';
import { BarItemIdentifier } from '@mui/x-charts';
import {useState, useRef} from "react"
import { Box, Card, Divider, Slider, Stack, Typography } from '@mui/material';

import useGetElementProperty from '../lib/useGetElementProperty';

interface BarChartDataProps {
  brightness: string[],
  ratio: number[]
}


const sampleData:BarChartDataProps = {brightness: [0.1, 0.3, 0.5, 0.8].map((item) => (`hsl(0, 0%, ${100*item}%)`)), ratio: [0.1, 0.3, 0.5, 0.1]
}

const sampleArray = Array.from({length: 100}, () => Math.random())


export function addLabels(series: any) {
  return series.map((item: any) => ({
    ...item,
    label: item.dataKey,
  }));
}

const calcColor = (bin: number): string[] => {

  const colorArray = [];
  for(let i=0; i<bin; i++){
    colorArray.push(i / bin  + 1 / (2* bin));
  }
  return colorArray.map((item) => (`hsl(0, 0%, ${100*item}%)`));
}

const calcHistogram = (data: number[], bin: number): number[]  => {
  const min = Math.min(...data);
  const max = Math.max(...data);

  const binWidth = (max - min) / bin;
  const histogram: number[] = new Array(bin).fill(0);
  

  for (const v of data){
    const binIndex = Math.floor(v  / binWidth);
    if(binIndex < bin){
      histogram[binIndex] += 1
    }else{
      histogram[bin - 1] += 1
    }
  }

  return histogram;
}

interface CustomBarChartProps {
  brightnessArray: number[]
}



export const CustomBarChart : React.FC<CustomBarChartProps> = ({brightnessArray}) => {
  
    const [itemData, setItemData] = useState<BarItemIdentifier>();
    const [itemNb, setItemNb] = useState<number>(2)
    const [bin, setBin] = useState<number>(10)
    const targetRef = useRef(null);
    const width = useGetElementProperty(targetRef)
    const aspect = 0.5
    const scale = 1

    const handleBinChange = (e:Event, newValue: number | number[]) => {
      if (typeof newValue != "number"){
        return;
      }
      setBin(newValue);
    }
    
    const chartsParams = {
      margin: { bottom: 0, left: 0, right: 0 , top:0},
     
    };

    // const [axisData, setAxisData]
    return (
      <Card variant="outlined" sx={{ height: '100%', flexGrow: 1 }}>
      <Box ref={targetRef} sx={{m:2}}>
        <Typography textAlign="left" sx={{mb:1}} fontWeight="fontWeightBold">Brightness</Typography>
        <Slider
                value={bin}
                onChange={handleBinChange}
                // valueLabelDisplay="auto"
                min={2}
                max={20}
                aria-labelledby="input-item-number"
                />
    
        <BarChart
          {...chartsParams}
          colors={calcColor(bin)}
          
          // Delete Line, tick, label 
          yAxis={[{ scaleType: 'band', data: ["brightness"], disableLine:true, disableTicks:true, tickLabelInterval: (() => false)
          }]}
          xAxis={[{disableLine: true, disableTicks:true , tickLabelInterval: (() => false)}]}
          
          // Series data, each object represents a stack category
          series={calcHistogram(brightnessArray, bin).map((item:number) => ({data: [item], stack: "brightness"}))}
          width={width * scale}
          height={width * aspect * scale}
          layout={"horizontal"}
          barLabel="value"
          slotProps={{
            legend: { hidden: true},
          }}
          onItemClick={(event, d) => setItemData(d)}
        />
    
      </Box>
      </Card>
    )
}

