import { useEffect, useState } from "react";

export interface MousePosition{
  x: number;
  y: number;
}


const useMousePosition = () => {
    const [mousePosition, setMousePosition] = useState<MousePosition>({x:0, y:0})


    useEffect(() => {
        const mouseMoveListener = (event:MouseEvent) => {
          setMousePosition({ x: event.clientX, y: event.clientY });
        };
    
        
        window.addEventListener("mousemove", mouseMoveListener);
    
        
        return () => {
          window.removeEventListener("mousemove", mouseMoveListener);
        };
      }, []);
      return mousePosition;
    
}


export default useMousePosition;