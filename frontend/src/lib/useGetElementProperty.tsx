import {useState, RefObject, useEffect} from "react";


type DOMRectProperty = keyof Omit<DOMRect, 'toJSON'>;
const useGetElementProperty = <T extends HTMLElement>(elementRef: RefObject<T>) =>{
    const [width, setWidth] = useState<number>(window.innerWidth);
  
    const getProperty = (targetProperty: DOMRectProperty): number =>{
      const clientRect = elementRef.current?.getBoundingClientRect();
        if (clientRect){
          return clientRect[targetProperty];
        }
        return 0;
    }
  
    useEffect(() =>{
  
      setWidth(getProperty("width"));
      const handleResize = () => {
        console.log("width", getProperty("width"));
        
        setWidth(getProperty("width"));
      }
      window.addEventListener("resize", handleResize);
  
      return () =>{
        window.removeEventListener("resize", handleResize);
      }
    }, []);
  
    return width;
  }

  export default useGetElementProperty;